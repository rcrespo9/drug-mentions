import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import pluralize from "pluralize";
import sanitizeString from "./utils/sanitizeString"

import drugsData from "./data/drugs.json";

import Search from "./components/Search";
import Lyrics from "./components/Lyrics";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

interface DrugReference {
  drugName: string;
  referenceCount: number; 
  isStreetName: boolean;
  drugTypes?: string[];
}

type DrugsAndLyrics = {
  drugReferences: DrugReference[];
  highlightedLyrics: string;
};

type SelectedSong = {
  title: string;
  lyrics: string;
};

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);
  const [
    drugsAndLyrics,
    setDrugsAndLyrics
  ] = useState<DrugsAndLyrics | null>(null);
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

  const scanLyricsForDrugs = (drugs: any[], lyrics: string) => {
    const sanitizedLyrics: string[] = sanitizeString(lyrics).split(" ");
    const drugReferences: DrugReference[] = [];
    const isDrugReferenced = (drugName:string, lyricWord:string): boolean => {
      const lowerCaseDrugWord = drugName.toLowerCase();
      const lowerCaseLyricWord = lyricWord.toLowerCase();

      return lowerCaseDrugWord === lowerCaseLyricWord || pluralize(lowerCaseDrugWord) === lowerCaseLyricWord;
    }
    const foundDrug = (drugName: string) => drugReferences.find((drugMentioned: DrugReference) => drugMentioned.drugName === drugName);
    let drugNamesArr: string[];
    let drugNamesRegexArr: string[];
    let highlightedLyrics: string;
    let highlightRegex: RegExp;

    drugs.forEach(drug =>
      sanitizedLyrics.forEach(lyricWord => {
        if (isDrugReferenced(drug.drugType, lyricWord)) {
          if (foundDrug(drug.drugType)) {
            foundDrug(drug.drugType)!.referenceCount += 1;
          } else {
            drugReferences.push(
              {
                drugName: drug.drugType,
                referenceCount: 1,
                isStreetName: false
              }
            );
          }
        }

        drug.streetNames.forEach((streetName:string) => {
          if (isDrugReferenced(streetName, lyricWord)) {
            if (foundDrug(streetName)) {
              let { drugTypes } = foundDrug(streetName)!;
              
              foundDrug(streetName)!.referenceCount += 1;
              
              if (!drugTypes!.includes(drug.drugType)) drugTypes!.push(drug.drugType);
            } else {
              drugReferences.push({
                drugName: streetName,
                referenceCount: 1,
                isStreetName: true,
                drugTypes: [drug.drugType]
              });
            }
          }
        })
      })
    );

    drugNamesArr = drugReferences.map(drugReference => drugReference.drugName);

    drugNamesRegexArr = Array.from(new Set(drugNamesArr)).map(
      drug => `\\b${drug}s?\\b`
    );

    highlightRegex = new RegExp(
      `${drugNamesRegexArr.join("|")}`,
      "ig"
    );

    highlightedLyrics = lyrics.replace(
      highlightRegex,
      word => `<mark class="highlighted">${word}</mark>`
    );

    setDrugsAndLyrics({ drugReferences, highlightedLyrics });
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

      {selectedSong && drugsAndLyrics && (
        <Lyrics
          songDetails={selectedSong.title}
          lyrics={drugsAndLyrics.highlightedLyrics}
        />
      )}
    </div>
  );
};

export default App;
