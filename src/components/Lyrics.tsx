import React from "react";
import styled from "styled-components";

type LyricsProps = {
  songDetails: string;
  lyrics: string;
};

const SongDetails = styled.h3``;
const LyricsSheet = styled.div`
  white-space: pre-line;

  > .highlighted {
    background-color: red;
  }
`;

const Lyrics = ({ songDetails, lyrics }: LyricsProps) => {
  return (
    <>
      <SongDetails>{songDetails}</SongDetails>
      <LyricsSheet dangerouslySetInnerHTML={{ __html: lyrics }} />
    </>
  );
};

export default Lyrics;
