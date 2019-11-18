import React from "react";
import styled from "styled-components";

import Block from "./Block";

type LyricsProps = {
  songDetails: string;
  lyrics: string;
};

const SongDetails = styled.h2``;
const LyricsSheet = styled.p`
  white-space: pre-line;

  > .highlighted {
    background-color: red;
  }
`;

const Lyrics = ({ songDetails, lyrics }: LyricsProps) => {
  return (
    <Block as="article" boxShadowColor="blue" hasPadding={true}>
      <SongDetails>{songDetails}</SongDetails>
      <LyricsSheet dangerouslySetInnerHTML={{ __html: lyrics }} />
    </Block>
  );
};

export default Lyrics;
