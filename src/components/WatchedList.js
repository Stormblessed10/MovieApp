import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, onDelete, onMovie }) {
  return <ul className="list list-movies">
    {watched.map((movie, i) => <WatchedMovie onMovie={onMovie} onDelete={onDelete} key={i} movie={movie} />)}
  </ul>;
}
