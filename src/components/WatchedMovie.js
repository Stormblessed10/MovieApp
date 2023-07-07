export function WatchedMovie({ movie, onDelete }) {
  return <li key={movie.imdbID}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>IMDb:</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>User:</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span></span>
        <span>{movie.Runtime} min</span>
      </p>
      <button className="btn-close" onClick={() => onDelete(movie.imdbID)}>✖</button>
    </div>
  </li>;
}
