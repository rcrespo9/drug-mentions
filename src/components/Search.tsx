import React from "react";
import styled from "styled-components";

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

const SearchInput = styled.input`
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
    <>
      <SearchInput
        onChange={textChange}
        placeholder="Search for a song or an artist..."
      />
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
    </>
  );
};

export default Search;
