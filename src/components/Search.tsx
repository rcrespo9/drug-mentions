import React, { useContext } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import { modularScale, rgba } from "polished";

import Block from "./Block";

type SearchProps = {
  textChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onInputFocus(): void;
  onInputBlur(): void;
  results: Results[] | null;
  onResultClick(event: React.MouseEvent<HTMLLIElement>): void;
  isResultsOpen: boolean;
  isLoading: boolean;
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
    color: ${props => rgba(props.theme.white, .4)};
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
const ResultsList = styled.ul`
  position: absolute;
  left: 0;
  z-index: 3;
  overflow-y: scroll;
  width: 100%;
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

  &:hover {
    background-color: ${props => rgba(props.theme.white, 0.05)};
  }
`;

const Search = ({
  textChange,
  onInputFocus,
  onInputBlur,
  results,
  onResultClick,
  isResultsOpen,
  isLoading
}: SearchProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <SearchContainer aria-busy={isLoading}>
      <Block boxShadowColor={themeContext.roseRed}>
        <SearchInput
          onChange={textChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          placeholder="Search for a song or an artist..."
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
      {results && isResultsOpen && (
        <ResultsList>
          {results.map(resultItem => {
            const { result } = resultItem;

            return (
              <ResultsListItem
                data-id={result.id}
                onMouseDown={onResultClick}
                key={result.id}
              >
                {result.full_title}
              </ResultsListItem>
            );
          })}
        </ResultsList>
      )}
    </SearchContainer>
  );
}

export default Search;
