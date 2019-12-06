import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import Placeholder from "./Placeholder";
import DrugMentionsContainer from "./DrugMentionsContainer";
import DrugMentionsList from "./DrugMentionsList";

const LoadingDrugMentions = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <DrugMentionsContainer>
      <Block hasPadding={true} boxShadowColor={themeContext.deepSaffron}>
        <Placeholder
          isHeader={true}
          width={modularScale(10)}
          marginBottom={modularScale(0)}
        />
        <Placeholder
          isHeader={true}
          width={modularScale(10)}
          marginBottom={modularScale(4)}
        />

        <DrugMentionsList as="div" isLoading={true}>
          {[...Array(8)].map((el, idx) => (
            <Placeholder height={modularScale(3)} key={idx} />
          ))}
        </DrugMentionsList>
      </Block>
    </DrugMentionsContainer>
  );
};

export default LoadingDrugMentions;
