import React, { useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import { debounce } from "lodash";

import drugsData from "./drugs.json";

import Search from "./components/Search";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

const App = () => {
  const [searchResults, setSearchResults] = useState<AxiosResponse | null>(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setLoadingState] = useState(false);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchSearchResults = (inputVal: any) => {
    setLoadingState(true);

    axios
      .get(`${baseApiURL}/search`, {
        params: {
          q: inputVal
        }
      })
      .then(response => {
        const { data } = response;

        setSearchResults(data);
      })
      .catch(error => {
        setError(true);
        setErrorMessage(error.message);
      })
      .finally(() => setLoadingState(false));
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
