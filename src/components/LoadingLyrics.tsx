import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import Placeholder from "./Placeholder";

const Verse = styled.div`
  margin-top: ${modularScale(4)};
`;

const LoadingLyrics = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Block hasPadding={true} boxShadowColor={themeContext.starCommandBlue}>
      <Placeholder
        isHeader={true}
        marginBottom={modularScale(0)}
      />
      <Placeholder isHeader={true} width={modularScale(11)} />

      {[...Array(4)].map((el, idx) => {
        return (
          <Verse>
            <Placeholder
              width={modularScale(8)}
              marginBottom={modularScale(-1)}
            />
            {[...Array(8)].map((el, idx) => (
              <>
                <Placeholder marginBottom={modularScale(-1)} />
              </>
            ))}
          </Verse>
        );
      })}
    </Block>
  );
};

export default LoadingLyrics;
