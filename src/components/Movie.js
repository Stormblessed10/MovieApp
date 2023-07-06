export function Movie({ movie, onMovie }) {
  return <li onClick={() => onMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    {movie.Year}
  </li>;
}
