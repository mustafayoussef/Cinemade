import { Movie } from './movie';

export interface Tv extends Movie {
  name: string;
}

export interface TvDto {
  page: number;
  results: Tv[];
  total_results: number;
  total_pages: number;
}

export interface TvVideoDto {
  id: number;
  results: TvVideo[];
}

export interface TvVideo {
  site: string;
  key: string;
}

export interface TvImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface TvCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}