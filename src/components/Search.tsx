import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import { modularScale, rgba } from "polished";

import Block from "./Block";

type SearchProps = {
  textChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onInputFocus(): void;
  onInputBlur?(): void;
  results: Results[] | null;
  onResultSelection(event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>): void;
  isResultsOpen: boolean;
  isLoading: boolean;
  selectedSongTitle: string | null;
  allowSearch(event: React.KeyboardEvent<HTMLInputElement>): void;
};

type Results = {
  result: ResultItem;
};

type ResultItem = {
  id: number;
  full_title: string;
};

const SearchContainer = styled.div`
  position: relative;
  max-width: ${modularScale(14)};
  margin: 0 auto;
`;
const SearchInput = styled.input`
  display: block;
  width: 100%;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: ${modularScale(-1)} ${modularScale(3)} ${modularScale(-1)}
    ${modularScale(-1)};
  color: ${props => props.theme.white};
  font-size: ${modularScale(1)};

  ::placeholder {
    color: ${props => rgba(props.theme.white, 0.4)};
  }
`;
const SVGIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: ${modularScale(0)};
  margin-top: calc(-${modularScale(1)} / 2);
`;
const SVGIcon = styled.svg`
  display: inline-block;
  width: ${modularScale(1)};
  height: ${modularScale(1)};
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;
const spinnerRotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled(SVGIcon)`
  animation: ${spinnerRotate} 1s linear infinite;
`;
const ResultsContainer = styled.div`
  position: absolute;
  left: 0;
  z-index: 3;
  width: 100%;
`;
const ResultsList = styled.ul`
  overflow-y: scroll;
  height: ${modularScale(9)};
  margin: 0;
  padding: 0;
  border: ${props => props.theme.globalBorder};
  border-top: none;
  background-color: ${props => props.theme.black};
`;
const ResultsListItem = styled.li`
  list-style: none;
  padding: ${modularScale(0)};
  font-size: ${modularScale(0)};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: ${props => props.theme.globalBorder};
  }

  &:hover,
  &:focus {
    background-color: ${props => rgba(props.theme.white, 0.05)};
  }
`;

const Search = ({
  textChange,
  onInputFocus,
  onInputBlur,
  results,
  onResultSelection,
  isResultsOpen,
  isLoading,
  selectedSongTitle,
  allowSearch
}: SearchProps) => {
  const [activeDescendant, setActiveDescendant] = useState<number | null>(null);
  const resultsRef = useRef<Array<HTMLLIElement | null>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const themeContext = useContext(ThemeContext);
  const isSearchActive: boolean = isResultsOpen || activeDescendant !== null;

  useEffect(() => {
    if (results) {
      resultsRef.current = resultsRef.current.slice(0, results.length);
    }

    if (activeDescendant !== null) {
      resultsRef.current[activeDescendant]!.focus(); 
    }
  }, [results, isResultsOpen, activeDescendant]);

  const setActiveResultItem = (resultIdx: number, e: React.MouseEvent<HTMLLIElement>) => {
    setActiveDescendant(resultIdx);
  };

  const clearActiveResultItem = () => {
    setActiveDescendant(null);
  }

  const verticalArrowsEvt = (e: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>) => {
    if (isResultsOpen && resultsRef.current) {
      const lastResultItem = resultsRef.current.length - 1;
      if (e.keyCode === 38) {
        if (activeDescendant !== null) {
          if (activeDescendant !== 0) {
            setActiveDescendant(activeDescendant - 1);
          } else {
            setActiveDescendant(lastResultItem);
          }
        } else {
          setActiveDescendant(lastResultItem)
        }
      } else if (e.keyCode === 40) {
        if (activeDescendant !== null) {
          if (activeDescendant !== lastResultItem) {
            setActiveDescendant(activeDescendant + 1);
          } else {
            setActiveDescendant(0);
          }
        } else {
          setActiveDescendant(0);
        }
      } else if (e.keyCode === 13) {
        setActiveDescendant(null);
      }
    }
  }

  const setInputVal = (
    songTitle: string,
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 13)
    ) {
      if (searchRef.current) {
        searchRef.current.value = songTitle;
      }
    }
  };

  return (
    <SearchContainer>
      <Block boxShadowColor={themeContext.roseRed}>
        <SearchInput
          onChange={textChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onKeyDown={(e) => {
            verticalArrowsEvt(e);
            allowSearch(e);
          }}
          placeholder="Search for a song or an artist..."
          aria-owns="results"
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          aria-activedescendant={
            activeDescendant !== null ? `song-${activeDescendant}` : undefined
          }
          spellCheck={false}
          autoCapitalize="none"
          role="combobox"
          ref={searchRef}
        />
        <SVGIconContainer aria-hidden="true">
          {isLoading ? (
            <Spinner>
              <use xlinkHref="#icon-spinner"></use>
            </Spinner>
          ) : (
            <SVGIcon>
              <use xlinkHref="#icon-search"></use>
            </SVGIcon>
          )}
        </SVGIconContainer>
      </Block>
      <ResultsContainer role="presentation">
        {results && isSearchActive && (
          <ResultsList
            aria-expanded={isResultsOpen}
            role="listbox"
            id="results"
            onKeyDown={verticalArrowsEvt}
          >
            {results.map((resultItem, i) => {
              const { result } = resultItem;

              return (
                <ResultsListItem
                  id={`song-${i}`}
                  data-id={result.id}
                  key={result.id}
                  ref={el => (resultsRef.current[i] = el)}
                  role="option"
                  aria-selected={selectedSongTitle === result.full_title}
                  onFocus={onInputFocus}
                  onKeyDown={e => {
                    setInputVal(result.full_title, e);
                    onResultSelection(e);
                  }}
                  onMouseDown={e => {
                    onResultSelection(e);
                    setInputVal(result.full_title, e);
                    clearActiveResultItem();
                  }}
                  onMouseEnter={e => setActiveResultItem(i, e)}
                  onMouseLeave={clearActiveResultItem}
                  tabIndex={0}
                >
                  {result.full_title}
                </ResultsListItem>
              );
            })}
          </ResultsList>
        )}
      </ResultsContainer>
    </SearchContainer>
  );
};

export default Search;
