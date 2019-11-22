import { createGlobalStyle } from "styled-components";
import {
  stripUnit,
  normalize,
  modularScale,
  fluidRange,
} from "polished";
import highlightStyles from "./highlightStyles";

export default createGlobalStyle`
  ${normalize()}

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  * :focus {
    outline-color: ${props => props.theme.starCommandBlue};
  }

  ::selection {
    ${highlightStyles};
  }

  ::-moz-selection {
    ${highlightStyles};
  }

  html {
    box-sizing: border-box;
    line-height: ${stripUnit(modularScale(1))};

    ${
      "" /* ${props =>
      fluidRange(
        {
          prop: "font-size",
          fromSize: "16px",
          toSize: "24px"
        },
        props.theme.breakpoints.sm,
        props.theme.breakpoints.lg
      )} */
    }
  }
  
  body {
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.white};
    font-family: ${props => `nimbus-sans, ${props.theme.fallbackFonts}`};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3 {
    font-family: ${props =>
      `nimbus-sans-extended, ${props.theme.fallbackFonts}`};
    font-weight: 700;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  a {
    color: inherit;
  }
`;
