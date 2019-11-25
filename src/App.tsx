import React, { useState, useCallback } from "react";
import { debounce, escapeRegExp } from "lodash";
import styled, { ThemeProvider } from "styled-components";
import { modularScale } from "polished";

import GlobalStyles from "./theme/globalStyles";
import variables from "./theme/variables";

import sanitizeString from "./utils/sanitizeString";

import drugsData from "./data/drugs.json";

import SVGIconography from "./components/SVGIconography";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Lyrics from "./components/Lyrics";
import DrugMentions from "./components/DrugMentions";
import LoadingLyrics from "./components/LoadingLyrics";
import LoadingDrugMentions from "./components/LoadingDrugMentions";

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
  grid-template-columns: ${(5 / 12) * 100}% 1fr;
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

  const fetchSearchResults = async (inputVal: any) => {
    setSearchLoadingState(true);
    !!inputVal ? setResultsStatus(true) : setResultsStatus(false);

    try {
      const response = await fetch(`${baseApiURL}/search?q=${inputVal}`);
      const results = await response.json();

      !!results.length ? setSearchResults(results) : setSearchResults(null);
      setSearchLoadingState(false);
    } catch (error) {
      setSearchLoadingState(false);
      throw new Error(error);
    }
  };

  const debouncedSearchResults = useCallback(
    debounce(fetchSearchResults, 500),
    []
  );

  const openSearchResults = () => {
    setResultsStatus(true);
  };

  const closeSearchResults = () => {
    setResultsStatus(false);
  };

  const drugRegex = (drugName: string) => {
    const characterSet = "[.,/#!$%^&*;:'{}=\\-_`~()@]";

    return `(?<!${characterSet})\\b${escapeRegExp(
      drugName
    )}s?(?!${characterSet}\\b)\\b`;
  };

  const highlightLyrics = (drugNames: string[], lyrics: string): string => {
    let drugNamesRegexes: string[];
    let highlightRegex: RegExp;
    let highlightedLyrics: string;

    drugNamesRegexes = Array.from(new Set(drugNames)).map(
      drug => drugRegex(drug)
    );

    highlightRegex = new RegExp(`${(drugNamesRegexes.join("|"))}`, "igm");

    highlightedLyrics = lyrics.replace(
      highlightRegex,
      word => `<mark class="highlighted">${word}</mark>`
    );

    return highlightedLyrics;
  };

  const scanLyricsForDrugs = (drugs: any[], lyrics: string) => {
    const drugReferences: DrugReference[] = [];
    // const sanitizedLyrics = sanitizeString(lyrics);
    const drugRefMatches = (
      drugName: string,
      lyrics: string
    ): RegExpMatchArray | null => {
      const regex: RegExp = new RegExp(drugRegex(drugName), "igm");
      const matches = lyrics.match(regex);

      return matches;
    };
    const drugInRefArray = (drugName: string): DrugReference | undefined =>
      drugReferences.find(
        (drugMentioned: DrugReference) => drugMentioned.drugName === drugName
      );
    let drugNames: string[];
    let totalDrugReferences: number;

    drugs.forEach(drug => {
      const drugTypesMentioned = drugRefMatches(drug.drugType, lyrics);

      if (drugTypesMentioned) {
        drugReferences.push({
          drugName: drug.drugType,
          referenceCount: drugTypesMentioned.length,
          isStreetName: false
        });
      }

      drug.streetNames.forEach((streetName: string) => {
        const streetNamesMentioned = drugRefMatches(streetName, lyrics);

        if (streetNamesMentioned) {
          if (drugInRefArray(streetName)) {
            let { drugTypes } = drugInRefArray(streetName)!;

            if (!drugTypes!.includes(drug.drugType))
              drugTypes!.push(drug.drugType);
          } else {
            drugReferences.push({
              drugName: streetName,
              referenceCount: streetNamesMentioned.length,
              isStreetName: true,
              drugTypes: [drug.drugType]
            });
          }
        }
      });
    });

    drugNames = drugReferences.map(drugReference => drugReference.drugName);
    totalDrugReferences = drugReferences.reduce(
      (acc, reference) => acc + reference.referenceCount,
      0
    );

    // console.log({
    //   totalReferences: totalDrugReferences,
    //   references: drugReferences
    // })

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
      setLyricsLoadingState(false);
      throw new Error(error);
    }
  };

  const selectSong = (e: React.MouseEvent<HTMLLIElement>) => {
    const songId: string | undefined = e.currentTarget.dataset.id;

    fetchSong(songId);
  };

  return (
    <ThemeProvider theme={variables}>
      <SiteWrapper>
        <GlobalStyles />
        <SVGIconography />
        <Header
          logo="Drug Mentions"
          blurb="Scan music lyrics for possible drug references."
        />
        <MainContent>
          <Search
            textChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debouncedSearchResults(e.currentTarget.value)
            }
            onInputFocus={openSearchResults}
            onInputBlur={closeSearchResults}
            results={searchResults}
            onResultClick={selectSong}
            isResultsOpen={isResultsOpen}
            isLoading={isSearchLoading}
          />
          {isLyricsLoading ? (
            <SplitPane>
              <LoadingDrugMentions />
              <LoadingLyrics />
            </SplitPane>
          ) : (
            selectedSong &&
            highlightedLyrics &&
            drugReferences && (
              <SplitPane aria-busy={isLyricsLoading}>
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
