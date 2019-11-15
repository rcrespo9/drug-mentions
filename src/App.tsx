import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import pluralize from "pluralize";
import styled from 'styled-components';
import sanitizeString from "./utils/sanitizeString";

import drugsData from "./data/drugs.json";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Lyrics from "./components/Lyrics";
import Loading from "./components/Loading";

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

const SiteWrapper = styled.div``;
const MainContent = styled.main``;

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);
  const [drugsAndLyrics, setDrugsAndLyrics] = useState<DrugsAndLyrics | null>(
    null
  );
  const [isResultsOpen, setResultsStatus] = useState(false);
  const [isSearchLoading, setSearchLoadingState] = useState(false);
  const [isLyricsLoading, setLyricsLoadingState] = useState(false);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchSearchResults = async (inputVal: any) => {
    setSearchLoadingState(true);
    !!inputVal ? setResultsStatus(true) : setResultsStatus(false);

    try {
      const response = await fetch(`${baseApiURL}/search?q=${inputVal}`);
      const results = await response.json();

      !!results.length ? setSearchResults(results) : setSearchResults(null);
      setSearchLoadingState(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setSearchLoadingState(false);
    }
  };

  const debouncedSearchResults = useCallback(
    debounce(fetchSearchResults, 500),
    []
  );

  const highlightLyrics = (drugNames: string[], lyrics: string): string => {
    let drugNamesRegexes: string[];
    let highlightRegex: RegExp;
    let highlightedLyrics: string;

    drugNamesRegexes = Array.from(new Set(drugNames)).map(
      drug => `\\b${drug}s?\\b`
    );

    highlightRegex = new RegExp(`${drugNamesRegexes.join("|")}`, "ig");

    highlightedLyrics = lyrics.replace(
      highlightRegex,
      word => `<mark class="highlighted">${word}</mark>`
    );

    return highlightedLyrics;
  };

  const scanLyricsForDrugs = (drugs: any[], lyrics: string) => {
    const drugReferences: DrugReference[] = [];
    const sanitizedLyrics: string[] = sanitizeString(lyrics).split(" ");
    const isDrugReferenced = (drugName: string, lyricWord: string): boolean => {
      const lowerCaseDrugWord = drugName.toLowerCase();
      const lowerCaseLyricWord = lyricWord.toLowerCase();

      return (
        lowerCaseDrugWord === lowerCaseLyricWord ||
        pluralize(lowerCaseDrugWord) === lowerCaseLyricWord
      );
    };
    const foundDrug = (drugName: string): DrugReference | undefined =>
      drugReferences.find(
        (drugMentioned: DrugReference) => drugMentioned.drugName === drugName
      );
    let drugNames: string[];

    drugs.forEach(drug =>
      sanitizedLyrics.forEach(lyricWord => {
        if (isDrugReferenced(drug.drugType, lyricWord)) {
          if (foundDrug(drug.drugType)) {
            foundDrug(drug.drugType)!.referenceCount += 1;
          } else {
            drugReferences.push({
              drugName: drug.drugType,
              referenceCount: 1,
              isStreetName: false
            });
          }
        }

        drug.streetNames.forEach((streetName: string) => {
          if (isDrugReferenced(streetName, lyricWord)) {
            if (foundDrug(streetName)) {
              let { drugTypes } = foundDrug(streetName)!;

              foundDrug(streetName)!.referenceCount += 1;

              if (!drugTypes!.includes(drug.drugType))
                drugTypes!.push(drug.drugType);
            } else {
              drugReferences.push({
                drugName: streetName,
                referenceCount: 1,
                isStreetName: true,
                drugTypes: [drug.drugType]
              });
            }
          }
        });
      })
    );

    drugNames = drugReferences.map(drugReference => drugReference.drugName);

    console.log(drugReferences);

    setDrugsAndLyrics({
      drugReferences,
      highlightedLyrics: highlightLyrics(drugNames, lyrics)
    });
  };

  const fetchSong = async (songId: string | undefined) => {
    setLyricsLoadingState(true);

    try {
      const response = await fetch(`${baseApiURL}/song-lyrics/${songId}`);
      const song = await response.json();

      setSelectedSong(song);
      scanLyricsForDrugs(drugsData.drugs, song.lyrics);
      setLyricsLoadingState(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLyricsLoadingState(false);
    }
  };

  const selectSong = (e: React.MouseEvent<HTMLLIElement>) => {
    const songId: string | undefined = e.currentTarget.dataset.id;

    fetchSong(songId);
    setResultsStatus(false);
  };

  return (
    <SiteWrapper>
        <Header logo="Drug Mentions" blurb="A cool blurb" />
        <MainContent>
          <Search
            textChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debouncedSearchResults(e.currentTarget.value)
            }
            results={searchResults}
            onResultClick={selectSong}
            isResultsOpen={isResultsOpen}
            isLoading={isSearchLoading}
          />
          {isLyricsLoading ? (
            <Loading />
          ) : (
            selectedSong &&
            drugsAndLyrics && (
              <Lyrics
                songDetails={selectedSong.title}
                lyrics={drugsAndLyrics.highlightedLyrics}
              />
            )
          )}
        </MainContent>
        <Footer
          attribution="Built using the Genius API by Rudy Crespo"
        />
      </SiteWrapper>
  );
};

export default App;
