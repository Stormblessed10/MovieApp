import { average } from "./App";

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <span>{watched.length} movies</span>
      <p>
        <span>IMDb:</span>
        <span>{avgImdbRating.toFixed(1).replace(".0", "")}</span>
      </p>
      <p>
        <span>User:</span>
        <span>{avgUserRating.toFixed(1).replace(".0", "")}</span>
      </p>
      <span>{avgRuntime} min</span>
    </div>
  </div>;
}
