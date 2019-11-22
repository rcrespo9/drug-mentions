import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import Placeholder from "./Placeholder";

const DrugTagsGrid = styled.div`
  margin-top: ${modularScale(3)};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${modularScale(8)}, auto));
  grid-gap: ${modularScale(1)};
`;

const LoadingDrugMentions = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Block hasPadding={true} boxShadowColor={themeContext.deepSaffron}>
      <Placeholder isHeader={true} />
      <Placeholder isHeader={true} />

      <DrugTagsGrid>
        {
          [...Array(8)].map((el, idx) => <Placeholder />)
        }
      </DrugTagsGrid>
    </Block>
  );
};

export default LoadingDrugMentions;
