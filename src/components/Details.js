import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { KEY } from "./App";
import { Loader } from "./Loader";

export function Details({ onClose, selectedId, onAddMovie, watched }) {
  const [userRate, setUserRate] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const findWatched = watched.find(movie => movie.imdbID === movieDetails.imdbID);

  function handleAddWatchedMovie() {
    const newMovie = {
      ...movieDetails,
      imdbRating: movieDetails.imdbRating,
      Runtime: +movieDetails.Runtime.split(" ")[0],
      userRating: userRate,
    };
    onAddMovie(newMovie);
    onClose();
  }

  useEffect(() => {
    const callback = (e) => {
      if (e.key !== "Escape") return;
      onClose();
      console.log('hehe');
    };

    document.addEventListener('keydown', callback);

    return function () {
      document.removeEventListener('keydown', callback);
    };
  }, [onClose]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data = await res.json();
        setMovieDetails(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movieDetails.Title) return;
    document.title = `Movie App | ${movieDetails.Title}`;
    return function () {
      document.title = "Movie App";
    };
  }, [movieDetails]);

  return <div className="details">
    {isLoading ? <Loader /> :
      <>
        <header>
          <button className="btn-close" onClick={onClose}>✖</button>
          <img className="details-poster" src={movieDetails.Poster} alt={movieDetails.Title} />
          <div className="details-overview">
            <h2>{movieDetails.Title}</h2>
            <p>{movieDetails.Released} • {movieDetails.Runtime}</p>
            <p>{movieDetails.Genre}</p>
            <div>{movieDetails.imdbRating} IMDb</div>
            <div>{movieDetails.Metascore} Metacritic</div>
          </div>
        </header>
        <section>
          <div className="rating">
            {findWatched ? `Your rating for this movie is ${findWatched.userRating} ⭐️`
              :
              <>
                <StarRating maxRating={10} onSetRating={setUserRate}></StarRating>
                {userRate && <button className="btn-add" onClick={() => handleAddWatchedMovie()}>Add to watched</button>}
              </>}
          </div>
          <p>{movieDetails.Plot}</p>
          <p>Main cast: {movieDetails.Actors}</p>
          <p>Director: {movieDetails.Director}</p>
        </section>
      </>}
  </div>;
}
