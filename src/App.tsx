import React, { useState, useCallback } from "react";
import { debounce, countBy } from "lodash";
import pluralize from "pluralize";

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
    const sanitizeString = (str: string) =>
      str
        .replace(/(\r\n|\n|\r)/gm, " ") // remove line breaks
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") // remove all punctuation
        .replace(/\s{2,}/g, " "); // remove extra spaces
    const splitLyrics: string[] = lyrics.split(' ');
    const drugsMentioned: string[] = [];
    let highlightedLyrics: string = lyrics;

    drugs.forEach(drug => splitLyrics.forEach(lyricWord => {
      const regex: RegExp = new RegExp(`^${drug}s?$`, "ig");
      const formattedLyricWord = sanitizeString(lyricWord);

      if (regex.test(formattedLyricWord)) {
        drugsMentioned.push(drug);
        highlightedLyrics.replace(regex, `<span class="highlighted">${lyricWord}</span>`);
      }
    }))
    
    console.log(countBy(drugsMentioned));
    console.log(highlightedLyrics);
  }

  const fetchSong = async (songId: string | undefined) => {
    setLoadingState(true);
    
    try {
      const response = await fetch(`${baseApiURL}/song-lyrics/${songId}`);
      const song = await response.json();

      setSelectedSong(song);
      scanLyricsForDrugs(drugsData.drugs, song.lyrics);
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
    setResultsStatus(false);
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
