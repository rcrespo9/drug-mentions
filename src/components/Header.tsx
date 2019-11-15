import React from "react";
import styled from "styled-components";

type HeaderProps = {
  logo: any;
  blurb: any;
};

const StyledHeader = styled.header``;
const Logo = styled.h1``;
const Blurb = styled.p``;

const Header = ({ logo, blurb }: HeaderProps) => {
  return (
    <StyledHeader>
      <Logo>{logo}</Logo>
      <Blurb>{blurb}</Blurb>
    </StyledHeader>
  );
};

export default Header;
