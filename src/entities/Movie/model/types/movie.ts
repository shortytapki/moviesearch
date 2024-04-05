interface ExternalId {
  kpHD?: string;
  imdb?: string;
  tmdb?: number;
}

interface Name {
  name: string;
  language?: string;
  type?: string;
}

type Type =
  | 'movie'
  | 'tv-series'
  | 'cartoon'
  | 'anime'
  | 'animated-series'
  | 'tv-show';

type TypeNumber = 1 | 2 | 3 | 4 | 5 | 6;

type Status =
  | 'filming'
  | 'pre-production'
  | 'completed'
  | 'announced'
  | 'post-production';

interface Fact {
  value: string;
  type?: string;
  spoiler?: string;
}

interface Rating {
  kp?: number;
  imdb?: number;
  tmdb?: number;
  filmCritics?: number;
  russianFilmCritics?: number;
  await?: number;
}

interface Votes {
  kp?: string;
  imdb?: number;
  tmdb?: number;
  filmCritics?: number;
  russianFilmCritics?: number;
  await?: number;
}

interface Logo {
  url?: string;
}

interface ShortImage extends Logo {
  previewUrl?: string;
}

interface Video {
  url?: string;
  name?: string;
  site?: string;
  size?: string;
  type?: string;
}

interface VideoTypes {
  trailers?: Video[];
}

interface ItemName {
  name: string;
}

interface PersonInMovie {
  id: number;
  photo?: string;
  name?: string;
  enName?: string;
  description?: string;
  profession?: string;
  enProfession?: string;
}

interface ReviewInfo {
  count?: string;
  positiveCount?: string;
  percentage?: string;
}

interface SeasonInfo {
  number?: number;
  episodesCount?: number;
}

interface CurrencyValue {
  value?: string;
  currency?: string;
}

interface Fees {
  world: CurrencyValue;
  russia: CurrencyValue;
  usa: CurrencyValue;
}

interface Premiere {
  country?: string;
  world?: string;
  russia?: string;
  digital?: string;
  cinema?: string;
  bluray?: string;
  dvd?: string;
}

interface LinkedMovie {
  id: number;
  name?: string;
  enName?: string;
  alternativeName?: string;
  type?: Type;
  poster?: ShortImage;
  rating?: Rating;
  year?: string;
}

interface WatchabilityItem {
  name?: string;
  logo: Logo;
  url: string;
}

interface Watchability {
  items: WatchabilityItem[];
}

interface YearRange {
  start?: number;
  end?: number;
}

interface Audience {
  count?: number;
  country?: string;
}

interface NetworkItem {
  name?: string;
  logo?: Logo;
}

interface Networks {
  items: NetworkItem[];
}

export interface Movie {
  id?: number;
  externalId?: ExternalId;
  name?: string;
  alternativeName?: string;
  enName?: string;
  names?: Name[];
  type?: Type;
  typeNumber?: TypeNumber;
  year?: number;
  description?: string;
  shortDescription?: string;
  slogan?: string;
  status?: Status;
  facts?: Fact[];
  rating: Rating;
  votes: Votes;
  movieLength?: number;
  ratingMpaa?: string;
  ageRating?: number;
  logo: Logo;
  poster: ShortImage;
  backdrop: ShortImage;
  videos: VideoTypes;
  genres: ItemName[];
  countries: ItemName[];
  persons: PersonInMovie[];
  reviewInfo: ReviewInfo;
  seasonsInfo: SeasonInfo[];
  budget: CurrencyValue;
  fees: Fees;
  premiere: Premiere;
  similarMovies?: LinkedMovie[];
  sequelsAndPrequels?: LinkedMovie[];
  watchability: Watchability;
  releaseYears: YearRange[];
  top10?: number;
  top250?: number;
  ticketsOnSale?: boolean;
  totalSeriesLength?: number;
  seriesLength?: number;
  isSeries?: boolean;
  audience?: Audience[];
  lists?: string[];
  networks?: Networks;
  updatedAt?: string;
  createdAt?: string;
}
