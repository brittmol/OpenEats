import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Search() {
  const history = useHistory();
  const location = useLocation();
  let val = location.search.split("?query=")[1];

  const [searchValue, setSearchValue] = useState(val || "");

  const handleSearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `?query=${searchValue}`,
      state: { detail: searchValue },
    });
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        placeholder="Restaurant, Location, or Cuisine"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="submit">Let's Go!</button>
    </form>
  );
}
