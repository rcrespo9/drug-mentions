import styled from "styled-components";
import { modularScale } from "polished";

type DrugMentionsList = {
  drugMentionsCount?: number;
};

const DrugMentionsList = styled.ul<DrugMentionsList>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      ${modularScale(7)},
      ${props => {
        if (props.drugMentionsCount) {
          return props.drugMentionsCount > 1 ? "auto" : modularScale(9);
        }
      }}
    )
  );
  grid-gap: ${modularScale(1)};
  margin: 0;
  padding: 0;
`;

export default DrugMentionsList;
