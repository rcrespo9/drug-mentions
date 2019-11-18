import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import Loading from "./Loading";

type SearchProps = {
  textChange(event: React.ChangeEvent<HTMLInputElement>): void;
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
`;
const SearchInput = styled.input`
  display: block;
  width: 100%;
  appearance: none;
  padding: ${modularScale(-2)};
  border: ${props => props.theme.globalBorder};
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  font-size: ${modularScale(1)};
`;
const ResultsList = styled.ul``;
const ResultsListItem = styled.li`
  cursor: pointer;
`;

const Search = ({
  textChange,
  results,
  onResultClick,
  isResultsOpen,
  isLoading
}: SearchProps) => {
  return (
    <SearchContainer>
      <Block as="div" boxShadowColor="red" hasBoxProps={false}>
        <SearchInput
          onChange={textChange}
          placeholder="Search for a song or an artist..."
        />
      </Block>
      {isLoading ? (
        <Loading />
      ) : (
        results &&
        isResultsOpen && (
          <ResultsList>
            {results.map(resultItem => {
              const { result } = resultItem;

              return (
                <ResultsListItem
                  data-id={result.id}
                  onClick={onResultClick}
                  key={result.id}
                >
                  {result.full_title}
                </ResultsListItem>
              );
            })}
          </ResultsList>
        )
      )}
    </SearchContainer>
  );
};

export default Search;
