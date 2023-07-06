import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, onDelete }) {
  return <ul className="list">
    {watched.map((movie, i) => <WatchedMovie onDelete={onDelete} key={i} movie={movie} />)}
  </ul>;
}
