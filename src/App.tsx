import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import styled, { ThemeProvider } from "styled-components";
import { modularScale } from "polished";

import GlobalStyles from "./theme/globalStyles";
import variables from "./theme/variables";

import SVGIconography from "./components/SVGIconography";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Lyrics from "./components/Lyrics";
import DrugMentions from "./components/DrugMentions";
import LoadingLyrics from "./components/LoadingLyrics";
import LoadingDrugMentions from "./components/LoadingDrugMentions";

import DrugReferences from "./types_interfaces/DrugReferences";

const baseApiURL = "https://drug-mentions-api.herokuapp.com";

type SelectedSong = {
  title: string;
  lyrics: string;
  drugReferences: DrugReferences;
};

type LyricsContainerProps = {
  isSongSelected: boolean;
  isSongLoading: boolean;
};

const SiteWrapper = styled.div`
  max-width: ${modularScale(15)};
  margin: 0 auto;
  padding: ${modularScale(4)} ${modularScale(1)} 0;
`;
const MainContent = styled.main``;
const LyricsContainer = styled.div<LyricsContainerProps>`
  margin-top: ${props =>
    props.isSongSelected || props.isSongLoading ? modularScale(5) : ""};
`;
const SplitPane = styled.div`
  display: grid;
  grid-gap: ${modularScale(3)};

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: ${8 / 12}fr 1fr;
  }
`;

const App = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);
  const [isSongSelected, setIsSongSelected] = useState<boolean>(false);
  const [isResultsOpen, setResultsStatus] = useState<boolean>(false);
  const [isSearchLoading, setSearchLoadingState] = useState<boolean>(false);
  const [isSongLoading, setSongLoadingState] = useState<boolean>(false);

  const openSearchResults = () => {
    if (searchResults) {
      setResultsStatus(true);
    }
  };

  const closeSearchResults = () => {
    setResultsStatus(false);
  };

  useEffect(() => {
    const escEvt = (e: KeyboardEvent): void => {
      if (e.keyCode === 27) {
        closeSearchResults();
      }
    }

    document.addEventListener('keydown', escEvt);
    return () => {
      document.removeEventListener("keydown", escEvt);
    };
  }, []);

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

  const fetchSong = async (songId: string | undefined) => {
    setSongLoadingState(true);

    try {
      const response = await fetch(`${baseApiURL}/song-lyrics/${songId}`);
      const song = await response.json();

      setSelectedSong(song);
      setSongLoadingState(false);
    } catch (error) {
      setSongLoadingState(false);
      throw new Error(error);
    }
  };

  const selectSong = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    e.persist();

    const songId: string | undefined = e.currentTarget.dataset.id;
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 13)
    ) {
      fetchSong(songId);
      closeSearchResults();
      setIsSongSelected(true);
    }
  };

  const allowSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40) {
      setIsSongSelected(false);
    }
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
            textChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!isSongSelected) {
                debouncedSearchResults(e.currentTarget.value);
              }
            }}
            allowSearch={allowSearch}
            openResults={openSearchResults}
            closeResults={closeSearchResults}
            results={searchResults}
            onResultSelection={selectSong}
            isResultsOpen={isResultsOpen}
            isLoading={isSearchLoading}
            selectedSongTitle={selectedSong ? selectedSong.title : null}
          />
          <LyricsContainer
            isSongSelected={!!selectedSong}
            isSongLoading={isSongLoading}
            aria-busy={isSongLoading}
            aria-live="polite"
          >
            {isSongLoading ? (
              <SplitPane>
                <LoadingDrugMentions />
                <LoadingLyrics />
              </SplitPane>
            ) : (
              selectedSong && (
                <SplitPane>
                  <DrugMentions
                    totalReferences={
                      selectedSong.drugReferences.totalReferences
                    }
                    references={selectedSong.drugReferences.references}
                  />

                  <Lyrics
                    songDetails={selectedSong.title}
                    lyrics={selectedSong.lyrics}
                  />
                </SplitPane>
              )
            )}
          </LyricsContainer>
        </MainContent>
        <Footer />
      </SiteWrapper>
    </ThemeProvider>
  );
};

export default App;
