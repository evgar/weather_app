export interface CityData {
  name: string;
  id: number;
  country: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  speed: number;
  description: string;
  lat: number;
  lon: number;
}

export interface SuggestedCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  id: number;
}

export interface CityDataResponse {
  name: string;
  id: number;
  sys: { country: string };
  main: { temp: number; temp_max: number; temp_min: number };
  wind: { speed: number };
  weather: [{ description: string }];
  coord: { lat: number; lon: number };
}
