interface ExternalId {
  kpHD: string | null;
  imdb: string | null;
  tmdb: number | null;
}

interface Name {
  name: string;
  language: string | null;
  type: string | null;
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
  type: string | null;
  spoiler: string | null;
}

interface Rating {
  kp: number | null;
  imdb: number | null;
  tmdb: number | null;
  filmCritics: number | null;
  russianFilmCritics: number | null;
  await: number | null;
}

interface Votes {
  kp: string | null;
  imdb: number | null;
  tmdb: number | null;
  filmCritics: number | null;
  russianFilmCritics: number | null;
  await: number | null;
}

interface Logo {
  url: string | null;
}

interface ShortImage extends Logo {
  previewUrl: string | null;
}

interface Video {
  url: string | null;
  name: string | null;
  site: string | null;
  size: string | null;
  type: string | null;
}

interface VideoTypes {
  trailers: Video[] | null;
}

interface ItemName {
  name: string;
}

export interface PersonInMovie {
  id: number;
  photo: string | null;
  name: string | null;
  enName: string | null;
  description: string | null;
  profession: string | null;
  enProfession: string | null;
}

export interface ReviewInfo {
  count: string | null;
  positiveCount: string | null;
  percentage: string | null;
}

export interface SeasonInfo {
  number: number | null;
  episodesCount: number | null;
}

interface CurrencyValue {
  value: string | null;
  currency: string | null;
}

interface Fees {
  world: CurrencyValue;
  russia: CurrencyValue;
  usa: CurrencyValue;
}

interface Premiere {
  country: string | null;
  world: string | null;
  russia: string | null;
  digital: string | null;
  cinema: string | null;
  bluray: string | null;
  dvd: string | null;
}

export interface LinkedMovie {
  id: number;
  name: string | null;
  enName: string | null;
  alternativeName: string | null;
  type: Type | null;
  poster: ShortImage | null;
  rating: Rating | null;
  year: string | null;
}

interface WatchabilityItem {
  name: string | null;
  logo: Logo;
  url: string;
}

interface Watchability {
  items: WatchabilityItem[];
}

interface YearRange {
  start: number | null;
  end: number | null;
}

interface Audience {
  count: number | null;
  country: string | null;
}

interface NetworkItem {
  name: string | null;
  logo: Logo | null;
}

interface Networks {
  items: NetworkItem[];
}

export interface Review {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
  updatedAt: string;
  createdAt: string;
}

export interface Movie {
  id: number | null;
  externalId: ExternalId | null;
  name: string | null;
  alternativeName: string | null;
  enName: string | null;
  names: Name[] | null;
  type: Type | null;
  typeNumber: TypeNumber | null;
  year: number | null;
  description: string | null;
  shortDescription: string | null;
  slogan: string | null;
  status: Status | null;
  facts: Fact[] | null;
  rating: Rating;
  votes: Votes;
  movieLength: number | null;
  ratingMpaa: string | null;
  ageRating: number | null;
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
  similarMovies: LinkedMovie[] | null;
  sequelsAndPrequels: LinkedMovie[] | null;
  watchability: Watchability;
  releaseYears: YearRange[];
  top10: number | null;
  top250: number | null;
  ticketsOnSale: boolean | null;
  totalSeriesLength: number | null;
  seriesLength: number | null;
  isSeries: boolean | null;
  audience: Audience[] | null;
  lists: string[] | null;
  networks: Networks | null;
  updatedAt: string | null;
  createdAt: string | null;
}
