import React from "react";
import styled from "styled-components";

type SearchProps = {
  textChange(event: React.ChangeEvent<HTMLInputElement>): void;
  results?: []
}

const StyledInput = styled.input``;
const StyledList = styled.ul``;

const Search = ({ textChange, results }: SearchProps) => {

  return (
    <>
      <StyledInput onChange={textChange} />
    </>
  );
};

export default Search;
