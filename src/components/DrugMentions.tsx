import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import DrugReferences from "../types_interfaces/DrugReferences";

import Block from "./Block";
import DrugMentionsContainer from "./DrugMentionsContainer";
import DrugMentionsList from "./DrugMentionsList";
import DrugMentionsItem from "./DrugMentionsItem";

const DrugMentions = ({ totalReferences, references }: DrugReferences) => {
  const themeContext = useContext(ThemeContext);

  return (
    <DrugMentionsContainer>
      <Block
        as="aside"
        header={`${totalReferences} possible drug references found`}
        boxShadowColor={themeContext.deepSaffron}
        hasPadding={true}
      >
        <DrugMentionsList drugMentionsCount={references.length}>
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
