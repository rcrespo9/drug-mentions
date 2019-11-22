import styled from "styled-components";
import { modularScale } from "polished";

const DrugMentionsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${modularScale(8)}, auto));
  grid-gap: ${modularScale(1)};
  margin: 0;
  padding: 0;
`;

export default DrugMentionsList;