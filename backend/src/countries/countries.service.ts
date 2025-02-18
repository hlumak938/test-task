import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  BorderData,
  CountryInfo,
  FlagData,
  PopulationResponse,
} from './countries.interface';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries(): Promise<CountryInfo[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<CountryInfo[]>(
        'https://date.nager.at/api/v3/AvailableCountries',
      ),
    );
    return data;
  }

  async getCountryInfo(countryCode: string) {
    const [borderData, flagData] = await Promise.all([
      firstValueFrom(
        this.httpService.get<BorderData>(
          `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
        ),
      ),
      firstValueFrom(
        this.httpService.get<FlagData>(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
        ),
      ),
    ]);

    const populationData = await firstValueFrom(
      this.httpService.post<PopulationResponse>(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          country: borderData.data.commonName,
        },
      ),
    );

    const flag = flagData.data.data.find(
      (f) => f.name.toLowerCase() === borderData.data.commonName.toLowerCase(),
    );

    return {
      borders: borderData.data,
      population: populationData.data.data,
      flag: flag?.flag ?? null,
    };
  }
}
