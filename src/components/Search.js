import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const searchBar = useRef(null);
  
  useEffect(() => {
    function callback (e) {
      if (document.activeElement === searchBar.current) return;
      if (e.key === "Enter") {
        searchBar.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    searchBar.current.focus();

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)} 
    ref={searchBar}/>
}
