import React from "react";
import styled from "styled-components";

type HeaderProps = {
  logo: any;
  blurb: any;
};

const StyledHeader = styled.header``;
const Logo = styled.h1`
  text-transform: uppercase;
  font-weight: 900;

  a {
    text-decoration: none;
  }
`;
const Blurb = styled.p``;

const Header = ({ logo, blurb }: HeaderProps) => {
  return (
    <StyledHeader>
      <Logo>
        <a href="/">{logo}</a>
      </Logo>
      <Blurb>{blurb}</Blurb>
    </StyledHeader>
  );
};

export default Header;
