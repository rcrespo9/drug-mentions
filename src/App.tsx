import React, { useState, useCallback } from "react";
import { debounce } from "lodash";

import drugsData from "./drugs.json";

import Search from "./components/Search";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<object | null>(null);
  const [drugsAndLyrics, setDrugsAndLyrics] = useState<object | null>(null);
  const [isResultsOpen, setResultsStatus] = useState<boolean>(false);
  const [isLoading, setLoadingState] = useState(false);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchSearchResults = async (inputVal: any) => {
    setLoadingState(true);
    !!inputVal ? setResultsStatus(true) : setResultsStatus(false);

    try {
      const response = await fetch(`${baseApiURL}/search?q=${inputVal}`);
      const results = await response.json();

      !!results.length ? setSearchResults(results) : setSearchResults(null);
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

  const scanLyricsForDrugs = (drugs: string[], lyrics: string) => {

  }

  const fetchSong = async (songId: string | undefined) => {
    setLoadingState(true);
    
    try {
      const response = await fetch(`${baseApiURL}/song-lyrics/${songId}`);
      const song = await response.json();

      setSelectedSong(song);
      setLoadingState(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoadingState(false);
    }
  }

  const selectSong = (e: React.MouseEvent<HTMLLIElement>) => {
    const songId: string | undefined = e.currentTarget.dataset.id;

    fetchSong(songId);
  };

  return (
    <div className="App">
      <Search
        textChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          debouncedSearchResults(e.currentTarget.value)
        }
        results={searchResults}
        onResultClick={selectSong}
        isResultsOpen={isResultsOpen}
      />
    </div>
  );
};

export default App;
