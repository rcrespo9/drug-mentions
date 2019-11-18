import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type HeaderProps = {
  logo: any;
  blurb: any;
};

const StyledHeader = styled.header`
  text-align: center;
`;
const Logo = styled.h1`
  text-transform: uppercase;
  font-size: ${modularScale(5)};
  font-weight: 900;

  a {
    text-decoration: none;
  }
`;
const Blurb = styled.p`
  font-size: ${modularScale(2)};
`;

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
