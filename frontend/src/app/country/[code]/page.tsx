'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

interface CountryInfo {
  flag: string;
  borders: {
    commonName: string;
    borders: [{
      commonName: string;
      countryCode: string;
    }];
  };
  population: {
    populationCounts: Array<{
      year: number;
      value: number;
    }>;
  };
}

function CountryInfo({params}: {params: Promise<{code: string}>}) {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params) return;

    const fetchCountryInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const code = (await params).code;
        const response = await fetch(`http://localhost:3001/countries/${code}`);
        const data = await response.json();
        setCountryInfo(data);
      } catch (err) {
        console.error('Error fetching country info:', err);
        setError('Failed to load country information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    void fetchCountryInfo();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-[200px] w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-500">{error}</p>
            <Button asChild className="mt-4">
              <Link href="/">Back to Countries</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          {countryInfo?.flag && (
            <Image
              src={countryInfo.flag}
              width={200}
              height={200}
              alt="Country flag"
              className="w-32 h-auto object-contain"
            />
          )}
          <CardTitle className="text-3xl">{countryInfo?.borders.commonName}</CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Border Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {countryInfo?.borders.borders.map((border: {countryCode: string, commonName: string}, index: number) => (
                <Button key={`${border.countryCode}-${index}`} variant="outline" asChild className="w-full">
                  <Link href={`/country/${border.countryCode}`}>{border.commonName}</Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Population Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={countryInfo?.population.populationCounts}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis
                    dataKey="year"
                    className="text-sm"
                  />
                  <YAxis
                    className="text-sm"
                    tickFormatter={(value) =>
                      new Intl.NumberFormat('en', {
                        notation: 'compact',
                        compactDisplay: 'short'
                      }).format(value)
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                    formatter={(value: number) =>
                      new Intl.NumberFormat('en').format(value)
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button asChild className="mt-6">
        <Link href="/">← Back to Countries</Link>
      </Button>
    </div>
  );
}

export default CountryInfo;