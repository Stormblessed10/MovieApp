import { useEffect, useState } from "react";
import { Details } from "./Details";
import { WatchedList } from "./WatchedList";
import { WatchedSummary } from "./WatchedSummary";
import { MovieList } from "./MovieList";
import { Main } from "./Main";
import { Box } from "./Box";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumResults } from "./NumResults";
import { NavBar } from "./NavBar";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";

export const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = "1732530d";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => JSON.parse(localStorage.getItem("watched")));
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");

  function handleSelect(id) {
    setSelectedId(selectedId === id ? null : id); 
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  } 

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteMovie(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched))
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});
        if (!res.ok) throw new Error("Something went wrong with fetching");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setMovies(data.Search);
      } catch(err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    } 
    fetchMovie();

    return function() {
      controller.abort();
    }
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList onMovie={handleSelect} movies={movies}/>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
        <Box>
          {!selectedId ? <>
            <WatchedSummary watched={watched}/>
            <WatchedList onDelete={handleDeleteMovie} watched={watched}/>
          </>
          : <Details key={selectedId} watched={watched} selectedId={selectedId} onAddMovie={handleAddWatched} onClose={handleCloseMovie}/>
          }
        </Box>
      </Main>
    </>
  );
}
