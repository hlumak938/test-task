'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/countries');
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    void fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Countries</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-500">{error}</p>
            <p className="text-sm text-gray-600 mt-2">
              Make sure the backend server is running at {process.env.NEXT_PUBLIC_API_URL}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country: { countryCode: string; name: string }) => (
          <HoverCard key={country.countryCode}>
            <HoverCardTrigger asChild>
              <Link href={`/country/${country.countryCode}`}>
                <Card className="transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle>{country.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{country.countryCode}</p>
                  </CardContent>
                </Card>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              Click to view detailed information about {country.name}
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
