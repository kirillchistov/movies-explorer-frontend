export interface User {
  _id?: string;
  name: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
}

export interface ApiErrorShape {
  statusCode: number;
  message: string;
}

export interface BeatFilmMovie {
  id: number;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string | { url: string; formats?: { thumbnail?: { url: string } } };
  trailerLink: string;
  nameRU: string;
  nameEN: string;
}

export interface SavedMovie {
  _id: string;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  owner?: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
}

export type Movie = BeatFilmMovie | SavedMovie;

export interface UpdateProfilePayload {
  name: string;
  email: string;
}
