import type {
  AuthCredentials,
  BeatFilmMovie,
  RegisterPayload,
  SavedMovie,
  UpdateProfilePayload,
  User,
} from '@movies-explorer/shared';

type MockUser = User & {
  _id: string;
  password: string;
};

const USERS_KEY = 'mockApi:users';
const MOVIES_KEY = 'mockApi:savedMovies';
const TOKEN_PREFIX = 'mock-token.';

const createApiError = (statusCode: number, message: string) => (
  Promise.reject({ statusCode, message })
);

const readStorage = <T>(key: string, fallback: T): T => {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const writeStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getUsers = () => readStorage<MockUser[]>(USERS_KEY, []);

const setUsers = (users: MockUser[]) => {
  writeStorage(USERS_KEY, users);
};

const getAllSavedMovies = () => readStorage<SavedMovie[]>(MOVIES_KEY, []);

const setAllSavedMovies = (movies: SavedMovie[]) => {
  writeStorage(MOVIES_KEY, movies);
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getUserIdFromToken = (token: string | null) => (
  token?.startsWith(TOKEN_PREFIX) ? token.slice(TOKEN_PREFIX.length) : null
);

const getCurrentUser = () => {
  const userId = getUserIdFromToken(localStorage.getItem('jwt'));
  const user = getUsers().find((item) => item._id === userId);

  return user || null;
};

const toPublicUser = ({ _id, name, email }: MockUser): User => ({
  _id,
  name,
  email,
});

export const mockRegister = async ({ email, password, name }: RegisterPayload) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return createApiError(409, 'Пользователь с таким email уже зарегистрирован');
  }

  const user: MockUser = {
    _id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  setUsers([...users, user]);

  return { data: toPublicUser(user) };
};

export const mockLogin = async ({ email, password }: AuthCredentials) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!user || user.password !== password) {
    return createApiError(401, 'Неправильные почта или пароль');
  }

  return { token: `${TOKEN_PREFIX}${user._id}` };
};

export const mockToken = async (token: string) => {
  const userId = getUserIdFromToken(token);
  const user = getUsers().find((item) => item._id === userId);

  if (!user) {
    return createApiError(401, 'Необходима авторизация');
  }

  return toPublicUser(user);
};

export const mockEditProfile = async ({ name, email }: UpdateProfilePayload) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return createApiError(401, 'Необходима авторизация');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();
  const duplicate = users.some((user) => (
    user._id !== currentUser._id && user.email.toLowerCase() === normalizedEmail
  ));

  if (duplicate) {
    return createApiError(409, 'Пользователь с таким email уже зарегистрирован');
  }

  const updatedUsers = users.map((user) => (
    user._id === currentUser._id
      ? { ...user, name: name.trim(), email: normalizedEmail }
      : user
  ));
  const updatedUser = updatedUsers.find((user) => user._id === currentUser._id);

  setUsers(updatedUsers);

  return toPublicUser(updatedUser!);
};

export const mockGetSavedMovies = async () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return createApiError(401, 'Необходима авторизация');
  }

  return getAllSavedMovies().filter((movie) => movie.owner === currentUser._id);
};

export const mockAddMovie = async (data: BeatFilmMovie & Partial<SavedMovie>) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return createApiError(401, 'Необходима авторизация');
  }

  const movieId = data.id || data.movieId;

  if (!movieId) {
    return createApiError(400, 'Переданы некорректные данные фильма');
  }

  const savedMovies = getAllSavedMovies();
  const existingMovie = savedMovies.find((movie) => (
    movie.owner === currentUser._id && movie.movieId === movieId
  ));

  if (existingMovie) {
    return existingMovie;
  }

  const movie: SavedMovie = {
    _id: createId(),
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: String(data.image),
    trailerLink: data.trailerLink,
    thumbnail: String(data.thumbnail || data.image),
    owner: currentUser._id,
    movieId,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
  };

  setAllSavedMovies([...savedMovies, movie]);

  return movie;
};

export const mockRemoveMovie = async (movieId: string) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return createApiError(401, 'Необходима авторизация');
  }

  const savedMovies = getAllSavedMovies();
  const movie = savedMovies.find((item) => (
    item._id === movieId && item.owner === currentUser._id
  ));

  if (!movie) {
    return createApiError(404, 'Фильм не найден');
  }

  setAllSavedMovies(savedMovies.filter((item) => item._id !== movieId));

  return movie;
};
