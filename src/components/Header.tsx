import React from "react";
import styled, { keyframes } from "styled-components";
import { modularScale, lighten } from "polished";

type HeaderProps = {
  logo: any;
  blurb: any;
};

const StyledHeader = styled.header`
  margin-bottom: ${modularScale(5)};
  text-align: center;
`;
const hoverLogoAnim = (
  firstColor: string,
  secondColor: string,
  thirdColor: string
) => keyframes`
  0% { color: ${firstColor}; }
  50% { color: ${secondColor}; }
  100% { color: ${thirdColor}; }
`;
const Logo = styled.h1`
  margin-bottom: ${modularScale(-7)};
  text-transform: uppercase;
  font-size: ${modularScale(5)};
  font-weight: ${props => props.theme.fontWeights.black};

  a {
    text-decoration: none;

    &:hover,
    &:focus {
      animation: ${props =>
          hoverLogoAnim(
            lighten(.1, props.theme.starCommandBlue),
            lighten(.2, props.theme.roseRed),
            props.theme.deepSaffron
          )}
        2s ease-in-out infinite;
    }
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
