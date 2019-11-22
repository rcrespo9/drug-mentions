import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { modularScale } from "polished";

import Block from "./Block";
import Placeholder from "./Placeholder";

const DrugTagsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${modularScale(8)}, auto));
  grid-gap: ${modularScale(1)};
`;

const LoadingDrugMentions = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Block hasPadding={true} boxShadowColor={themeContext.deepSaffron}>
      <Placeholder isHeader={true} width={modularScale(10)} marginBottom={modularScale(0)} />
      <Placeholder isHeader={true} width={modularScale(10)} marginBottom={modularScale(4)} />

      <DrugTagsGrid>
        {
          [...Array(8)].map((el, idx) => <Placeholder height={modularScale(3)} />)
        }
      </DrugTagsGrid>
    </Block>
  );
};

export default LoadingDrugMentions;
