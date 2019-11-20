import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReference from "../types_interfaces/DrugReference";

const ListItem = styled.li`
  list-style: none;
`;

const DrugMentionsItem = ({
  drugName,
  referenceCount,
  drugTypes
}: DrugReference) => {
  return <ListItem>{drugName}</ListItem>;
};

export default DrugMentionsItem;
