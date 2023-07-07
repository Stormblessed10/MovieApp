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
import { useMovie } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "1732530d";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const {error, isLoading, movies} = useMovie(query);

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
