import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

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
