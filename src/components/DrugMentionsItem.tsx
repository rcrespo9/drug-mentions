import React, { useState } from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReference from "../types_interfaces/DrugReference";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: ${modularScale(-2)};
  border: ${props => props.theme.globalBorder};
  font-size: ${modularScale(0)};
`;

const Badge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${modularScale(2)};
  height: ${modularScale(2)};
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  font-size: ${modularScale(-1)};
  font-weight: 700;
  text-align: center;
`;

const DrugMentionsItem = ({
  drugName,
  referenceCount,
  drugTypes
}: DrugReference) => {
  const [isInfoOpen, setInfoStatus] = useState<boolean>(false);

  return (
    <ListItem>
      {drugName} <Badge>{referenceCount}</Badge>
    </ListItem>
  );
};

export default DrugMentionsItem;
