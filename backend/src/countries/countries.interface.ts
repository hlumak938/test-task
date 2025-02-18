export interface CountryInfo {
  countryCode: string;
  name: string;
}

export interface BorderData {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

export interface PopulationResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    populationCounts: Array<{
      year: number;
      value: number;
    }>;
  };
}

export interface FlagData {
  error: boolean;
  msg: string;
  data: Array<{
    name: string;
    flag: string;
  }>;
}
