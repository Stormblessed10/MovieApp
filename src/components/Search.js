import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

export function Search({ query, setQuery }) {
  const searchBar = useRef(null);
  
  useKey("Enter", () => {
    if (document.activeElement === searchBar.current) return;
    searchBar.current.focus();
    setQuery("");
  });

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)} 
    ref={searchBar}/>
}
