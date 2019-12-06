import styled from "styled-components";
import { modularScale } from "polished";

type DrugMentionsListProps = {
  drugMentionsCount?: number;
  isLoading?: boolean;
};

const DrugMentionsList = styled.ul<DrugMentionsListProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      ${modularScale(7)},
      ${props => {
        const { drugMentionsCount, isLoading }: DrugMentionsListProps = props;

        if (drugMentionsCount) {
          if (drugMentionsCount > 1) {
            return "auto";
          } else {
            return modularScale(9);
          }
        }

        if (isLoading) {
          return "auto";
        }
      }}
    )
  );
  grid-gap: ${modularScale(1)};
  margin: 0;
  padding: 0;
`;

export default DrugMentionsList;
