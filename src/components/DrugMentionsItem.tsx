import React, { useState } from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReference from "../types_interfaces/DrugReference";

type InfoProps = {
  isInfoOpen: boolean;
}

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

const InfoItems = styled.span`
  display: flex;
  align-items: center;
`;

const InfoBtn = styled.button<InfoProps>`
  appearance: none;
  margin-left: ${modularScale(-6)};
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: ${modularScale(1)};
  height: ${modularScale(1)};

  &:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-left: ${modularScale(-3)} solid transparent;
    border-right: ${modularScale(-3)} solid transparent;
    border-top: calc(${modularScale(-3)} * 1.25) solid ${props => props.theme.white};
    transform: ${props => (props.isInfoOpen ? "rotate(180deg)" : "")};
  }
`;

const DrugMentionsItem = ({
  drugName,
  referenceCount,
  isStreetName,
  drugTypes
}: DrugReference) => {
  const [isInfoOpen, setInfoStatus] = useState<boolean>(false);

  const toggleInfoStatus = () => {
    setInfoStatus(!isInfoOpen);
  }

  return (
    <ListItem>
      {drugName}
      <InfoItems>
        <Badge>{referenceCount}</Badge>
        {isStreetName && (
          <InfoBtn isInfoOpen={isInfoOpen} onClick={toggleInfoStatus} />
        )}
      </InfoItems>
    </ListItem>
  );
};

export default DrugMentionsItem;
