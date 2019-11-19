import React, { useState, useCallback } from "react";
import { debounce} from "lodash";
import pluralize from "pluralize";
import styled, { ThemeProvider } from "styled-components";
import { modularScale } from "polished";

import GlobalStyles from "./theme/globalStyles";
import variables from "./theme/variables";

import sanitizeString from "./utils/sanitizeString";

import drugsData from "./data/drugs.json";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Lyrics from "./components/Lyrics";
import DrugMentions from "./components/DrugMentions";
import Loading from "./components/Loading";

import DrugReference from "./types_interfaces/DrugReference";
import DrugReferences from "./types_interfaces/DrugReferences";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

type SelectedSong = {
  title: string;
  lyrics: string;
};

const SiteWrapper = styled.div`
  max-width: ${modularScale(15)};
  margin: 0 auto;
  padding: ${modularScale(4)} ${modularScale(0)} 0;
`;
const MainContent = styled.main``;
const SplitPane = styled.div`
  display: grid;
  grid-template-columns: ${100 / 3}% 1fr;
  grid-gap: ${modularScale(3)};
`;

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);
  const [drugReferences, setDrugReferences] = useState<DrugReferences | null>(
    null
  );
  const [highlightedLyrics, setHighlightedLyrics] = useState<string | null>(
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
    let totalDrugReferences: number;

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
    totalDrugReferences = drugReferences.reduce(
      (acc, reference) => acc + reference.referenceCount, 0
    );

    setHighlightedLyrics(highlightLyrics(drugNames, lyrics.trim()));
    setDrugReferences({
      totalReferences: totalDrugReferences,
      references: drugReferences
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
    <ThemeProvider theme={variables}>
      <SiteWrapper>
        <GlobalStyles />
        <Header
          logo="Drug Mentions"
          blurb="Scan music lyrics for possible drug references."
        />
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
            highlightedLyrics &&
            drugReferences && (
              <SplitPane>
                <DrugMentions 
                  totalReferences={drugReferences.totalReferences} 
                  references={drugReferences.references}
                />

                <Lyrics
                  songDetails={selectedSong.title}
                  lyrics={highlightedLyrics}
                />
              </SplitPane>
            )
          )}
        </MainContent>
        {/* <Footer attribution="Built using the Genius API by Rudy Crespo" /> */}
      </SiteWrapper>
    </ThemeProvider>
  );
};

export default App;
