//  Хук для фильтрации короткометражек  //
import { SHORTIE } from "../utils/constants";

const useFilterShorts = () => {
  const handleSearch = (movies, movieName) => {
    return movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                                    || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
  }

  const handleCheckbox = (movies, checked) => {
    if (!!checked) {
      return movies.filter(movie => movie.duration <= SHORTIE);
    } else {
      return movies;
    }
  }
  return { handleSearch, handleCheckbox }
}

export default useFilterShorts;
