import React, { useState, useCallback } from "react";
import { debounce } from "lodash";

import drugsData from "./drugs.json";

import Search from "./components/Search";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setLoadingState] = useState(false);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchSearchResults = async (inputVal: any) => {
    setLoadingState(true);

    try {
      const response = await fetch(`${baseApiURL}/search?q=${inputVal}`);
      const results = await response.json();

      if (!!results.length) {
        setSearchResults(results);
      } else {
        setSearchResults(null);
      }
      setLoadingState(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoadingState(false);
    }
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
        results={searchResults}
      />
    </div>
  );
};

export default App;
