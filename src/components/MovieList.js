import { Movie } from "./Movie";

export function MovieList({ movies, onMovie }) {
  return <ul className="list list-movies">
    {movies?.map((movie) => <Movie onMovie={onMovie} key={movie.imdbID} movie={movie} />)}
  </ul>;
}
