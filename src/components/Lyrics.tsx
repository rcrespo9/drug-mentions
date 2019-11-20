import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";

type LyricsProps = {
  songDetails: string;
  lyrics: string;
};

const LyricsSheet = styled.p`
  font-size: ${modularScale(1)};
  white-space: pre-line;

  > .highlighted {
    padding: 0 ${modularScale(-6)};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
  }
`;

const Lyrics = ({ songDetails, lyrics }: LyricsProps) => {
  return (
    <Block as="article" header={songDetails} boxShadowColor="blue" hasPadding={true}>
      <LyricsSheet dangerouslySetInnerHTML={{ __html: lyrics }} />
    </Block>
  );
};

export default Lyrics;
