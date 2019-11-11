import React, { useState, useCallback } from "react";
import { debounce, countBy } from "lodash";
import pluralize from "pluralize";

import drugsData from "./drugs-1.json";

import Search from "./components/Search";
import Lyrics from "./components/Lyrics";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

type DrugsLyrics = {
  drugsMentionedTally: object;
  highlightedLyrics: string;
};

type SelectedSong = {
  title: string;
  lyrics: string;
};

interface DrugReference {
  drugName: string;
  referenceCount: number; 
  isStreetName: boolean;
}

interface StreetNameReference extends DrugReference {
  drugTypes: string[];
}

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);
  const [
    drugsTallyAndLyrics,
    setDrugsTallyAndLyrics
  ] = useState<DrugsLyrics | null>(null);
  const [isResultsOpen, setResultsStatus] = useState(false);
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
    const sanitizedLyrics: string[] = sanitizeString(lyrics).split(" ");
    const drugsMentionedArr: string[] = [];
    let drugsMentionedTally: object;
    let highlightedLyrics: string;

    drugs.forEach(drug =>
      sanitizedLyrics.forEach(lyricWord => {
        const lowerCaseDrugWord = drug.toLowerCase();
        const lowerCaseLyricWord = lyricWord.toLowerCase();

        if (
          lowerCaseDrugWord === lowerCaseLyricWord ||
          pluralize(lowerCaseDrugWord) === lowerCaseLyricWord
        ) {
          drugsMentionedArr.push(drug);
        }
      })
    );

    const drugsMentionedRegexArr = Array.from(new Set(drugsMentionedArr)).map(
      drug => `\\b${drug}s?\\b`
    );
    const highlightRegex = new RegExp(
      `${drugsMentionedRegexArr.join("|")}`,
      "ig"
    );

    drugsMentionedTally = countBy(drugsMentionedArr);
    highlightedLyrics = lyrics.replace(
      highlightRegex,
      word => `<mark class="highlighted">${word}</mark>`
    );

    setDrugsTallyAndLyrics({ drugsMentionedTally, highlightedLyrics });
  };

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
  };

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

      {selectedSong && drugsTallyAndLyrics && (
        <Lyrics
          songDetails={selectedSong.title}
          lyrics={drugsTallyAndLyrics.highlightedLyrics}
        />
      )}
    </div>
  );
};

export default App;
