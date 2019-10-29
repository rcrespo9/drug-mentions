import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";

import drugsData from "./drugs.json";

import Search from "./components/Search";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const fetchSearchResults = (inputVal: any) => {
    axios
      .get("https://api.genius.com/search", {
        params: {
          q: inputVal,
          access_token: process.env.REACT_APP_GENIUS_API_TOKEN
        }
      })
      .then(response => {
        const { data: {
          response: {
            hits
          }
        } } = response

        setSearchResults(hits);
      });
  };

  const debouncedSearchResults = useCallback(
    debounce(fetchSearchResults, 500),
    []
  );

  return (
    <div className="App">
      <Search
        textChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          debouncedSearchResults(e.currentTarget.value)
        }
      />
    </div>
  );
};

export default App;
