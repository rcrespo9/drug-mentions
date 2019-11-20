import React, { useState } from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReference from "../types_interfaces/DrugReference";

type DrugInfoProps = {
  isDrugInfoOpen: boolean;
};

const ListItem = styled.li`
  list-style: none;
  font-size: ${modularScale(0)};
`;

const ListItemContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${modularScale(-2)};
  border: ${props => props.theme.globalBorder};
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
  font-weight: ${props => props.theme.fontWeights.bold};
  text-align: center;
`;

const DrugInfoItems = styled.span`
  display: flex;
  align-items: center;
`;

const DrugInfoBtn = styled.button<DrugInfoProps>`
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
    border-top: calc(${modularScale(-3)} * 1.25) solid
      ${props => props.theme.white};
    transform: ${props => (props.isDrugInfoOpen ? "rotate(180deg)" : "")};
  }
`;

const DrugInfo = styled.span<DrugInfoProps>`
  display: ${props => (props.isDrugInfoOpen ? "block" : "none")};
  padding: ${modularScale(-2)};
  border: ${props => props.theme.globalBorder};
  border-top: none;

  ul {
    margin-top: ${modularScale(-5)};
  }

  strong {
    font-weight: ${props => props.theme.fontWeights.bold};
  }
`;

const DrugMentionsItem = ({
  drugName,
  referenceCount,
  isStreetName,
  drugTypes
}: DrugReference) => {
  const [isDrugInfoOpen, setInfoStatus] = useState<boolean>(false);

  const toggleInfoStatus = () => {
    setInfoStatus(!isDrugInfoOpen);
  };

  return (
    <ListItem>
      <ListItemContent>
        {drugName}
        <DrugInfoItems>
          <Badge>{referenceCount}</Badge>
          {isStreetName && (
            <DrugInfoBtn
              isDrugInfoOpen={isDrugInfoOpen}
              onClick={toggleInfoStatus}
            />
          )}
        </DrugInfoItems>
      </ListItemContent>
      {isStreetName && drugTypes && (
        <DrugInfo isDrugInfoOpen={isDrugInfoOpen}>
          {drugTypes.length > 1 ? (
            <>
              <span>Known as a street name for the following drugs:</span>
              <ul>
                {drugTypes.map((drugType, idx) => (
                  <li key={idx}>{drugType}</li>
                ))}
              </ul>
            </>
          ) : (
            <span>
              Known as a street name for <strong>{drugTypes[0]}</strong>
            </span>
          )}
        </DrugInfo>
      )}
    </ListItem>
  );
};

export default DrugMentionsItem;
