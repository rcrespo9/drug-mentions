import React from "react";
import styled from "styled-components";

type SearchProps = {
  textChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const StyledInput = styled.input``;

const Search = ({ textChange }: SearchProps) => {

  return <StyledInput onChange={textChange} />;
};

export default Search;
