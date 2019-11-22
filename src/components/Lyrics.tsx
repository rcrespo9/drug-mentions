import React from "react";
import styled from "styled-components";
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
  return (
    <Block
      as="article"
      header={songDetails}
      boxShadowColor="#0E79B2"
      hasPadding={true}
    >
      <LyricsSheet dangerouslySetInnerHTML={{ __html: lyrics }} />
    </Block>
  );
};

export default Lyrics;
