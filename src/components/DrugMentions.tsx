import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReferences from "../types_interfaces/DrugReferences";

import Block from "./Block";
import DrugMentionsItem from "./DrugMentionsItem";

const DrugMentionsContainer = styled.div`
  align-self: flex-start;
`;

const DrugMentionsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${modularScale(7)}, 1fr));
  grid-gap: ${modularScale(1)};
  margin: 0;
  padding: 0;
`;

const DrugMentions = ({ totalReferences, references }: DrugReferences) => {
  return (
    <DrugMentionsContainer>
      <Block
        as="aside"
        header={`${totalReferences} possible drug references found`}
        boxShadowColor="purple"
        hasPadding={true}
      >
        <DrugMentionsList>
          {references.map((reference, idx) => (
            <DrugMentionsItem
              drugName={reference.drugName}
              referenceCount={reference.referenceCount}
              isStreetName={reference.isStreetName}
              drugTypes={reference.drugTypes}
              key={idx}
            />
          ))}
        </DrugMentionsList>
      </Block>
    </DrugMentionsContainer>
  );
};

export default DrugMentions;
