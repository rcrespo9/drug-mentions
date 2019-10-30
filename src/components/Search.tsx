import React from "react";
import styled from "styled-components";

type SearchProps = {
  textChange(event: React.ChangeEvent<HTMLInputElement>): void;
  results: Results[] | null
}

type Results = {
  result: ResultItem
}

type ResultItem = {
  id: number,
  full_title: string
}

const SearchInput = styled.input``;
const ResultsList = styled.ul``;
const ResultsListItem = styled.li``;

const Search = ({ textChange, results }: SearchProps) => {

  return (
    <>
      <SearchInput onChange={textChange} />
      {results &&
        <ResultsList>
          {results.map(resultItem => {
            const { result } = resultItem;

            return <ResultsListItem key={result.id}>{result.full_title}</ResultsListItem>
          })}
        </ResultsList>
      }
    </>
  );
};

export default Search;
