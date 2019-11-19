import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReferences from "../types_interfaces/DrugReferences";

import Block from "./Block";

const DrugMentionsContainer = styled.div`
  align-self: flex-start;
`;

const DrugMentions = ({ totalReferences, references }: DrugReferences) => {
  return (
    <DrugMentionsContainer>
      <Block
        as="aside"
        header={`${totalReferences} possible drug references found`}
        boxShadowColor="purple"
        hasPadding={true}
      />
    </DrugMentionsContainer>
  );
};

export default DrugMentions;
