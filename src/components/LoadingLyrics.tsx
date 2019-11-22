import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import Placeholder from "./Placeholder";

const Verse = styled.div`
  margin-top: ${modularScale(4)};
  
  div {
    margin-bottom: ${modularScale(-1)};
  }
`;

const VerseLabel = styled.div`
  max-width: ${modularScale(8)};
`;

const LoadingLyrics = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Block hasPadding={true} boxShadowColor={themeContext.starCommandBlue}>
      <Placeholder isHeader={true} />

      {[...Array(4)].map((el, idx) => {
        return (
          <Verse>
            <VerseLabel>
              <Placeholder />
            </VerseLabel>
            {[...Array(8)].map((el, idx) => (
              <>
                <Placeholder />
              </>
            ))}
          </Verse>
        );
      })}
    </Block>
  );
};

export default LoadingLyrics;
