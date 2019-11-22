import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import highlightStyles from "../theme/highlightStyles";

type LyricsProps = {
  songDetails: string;
  lyrics: string;
};

const LyricsSheet = styled.p`
  font-size: ${modularScale(1)};
  white-space: pre-line;

  > .highlighted {
    padding: 0 ${modularScale(-6)};
    ${highlightStyles};
  }
`;

const Lyrics = ({ songDetails, lyrics }: LyricsProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Block
      as="article"
      header={songDetails}
      boxShadowColor={themeContext.starCommandBlue}
      hasPadding={true}
    >
      <LyricsSheet dangerouslySetInnerHTML={{ __html: lyrics }} />
    </Block>
  );
};

export default Lyrics;
