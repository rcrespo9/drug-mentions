import React from "react";
import styled, { keyframes } from "styled-components";
import { modularScale, lighten, fluidRange, stripUnit } from "polished";

type HeaderProps = {
  logo: any;
  blurb: any;
};

const StyledHeader = styled.header`
  margin-bottom: ${modularScale(4)};
  text-align: center;
`;
const hoverLogoAnim = (
  firstColor: string,
  secondColor: string,
  thirdColor: string
) => keyframes`
  0% { color: ${firstColor}; }
  30% { color: ${secondColor}; }
  60% { color: ${thirdColor}; }
  100% { color: ${thirdColor}; }
`;
const Logo = styled.h1`
  margin-bottom: ${modularScale(-5)};
  text-transform: uppercase;
  font-size: ${modularScale(5)};
  font-weight: ${props => props.theme.fontWeights.black};
  line-height: ${stripUnit(modularScale(0))};

/*   ${props =>
    fluidRange(
      {
        prop: "font-size",
        fromSize: "38px",
        toSize: "67px"
      },
      props.theme.breakpoints.xs,
      props.theme.breakpoints.lg
    )} */

  a {
    text-decoration: none;

    &:hover,
    &:focus {
      animation: ${props =>
        hoverLogoAnim(
          lighten(0.1, props.theme.starCommandBlue),
          lighten(0.2, props.theme.roseRed),
          props.theme.deepSaffron
        )}
        5s ease-in-out infinite;
    }
  }
`;
const Blurb = styled.p`
  font-size: ${modularScale(2)}
/*   ${props =>
  fluidRange(
    {
      prop: "font-size",
      fromSize: "21px",
      toSize: "28px"
    },
    props.theme.breakpoints.xs,
    props.theme.breakpoints.lg
  )} */
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
