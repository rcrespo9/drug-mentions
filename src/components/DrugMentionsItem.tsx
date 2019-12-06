import React, { useState } from "react";
import styled, { css } from "styled-components";
import { modularScale, hideVisually } from "polished";

import DrugReference from "../types_interfaces/DrugReference";

type DrugInfoProps = {
  drugName?: string;
  isStreetName?: boolean;
  isDrugInfoOpen: boolean;
};

const sharedFlexStyles = css`
  display: flex;
  align-items: center;
`;

const sharedWordBreakStyles = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const listItemPadding = css`
  padding: ${modularScale(-2)};
`;

const resetBtnStyles = css`
  width: 100%;
  appearance: none;
  color: inherit;
  font-size: inherit;
  background-color: transparent;
  cursor: pointer;
`;

const ListItem = styled.li<DrugInfoProps>`
  ${props => (props.isDrugInfoOpen ? "grid-column: span 2;" : "")}
  list-style: none;
  font-size: ${modularScale(0)};
`;

const ListItemContent = styled.span.attrs<DrugInfoProps>(
  props =>
    props.isStreetName && {
      id: `${props.drugName!.toLowerCase()}Button`,
      "aria-expanded": props.isDrugInfoOpen,
      "aria-controls": `${props.drugName!.toLowerCase()}Info`
    }
)<DrugInfoProps>`
  ${sharedFlexStyles};
  ${listItemPadding};
  ${props => (props.isStreetName ? resetBtnStyles : "")}
  justify-content: space-between;
  border: ${props => props.theme.globalBorder};
`;

const ListItemText = styled.span`
  ${sharedWordBreakStyles};
  padding-right: ${modularScale(-2)};
`;

const Badge = styled.span.attrs(props => ({
  "aria-hidden": "true"
}))`
  ${sharedFlexStyles};
  justify-content: center;
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
  ${sharedFlexStyles}
`;

const DrugInfoIcon = styled.span.attrs(props => ({
  "aria-hidden": "true"
}))<DrugInfoProps>`
  margin-left: ${modularScale(-6)};
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

const DrugInfo = styled.span.attrs<DrugInfoProps>(props => ({
  id: `${props.drugName!.toLowerCase()}Info`,
  "aria-expanded": props.isDrugInfoOpen,
  "aria-labelledby": `${props.drugName!.toLowerCase()}Button`
}))<DrugInfoProps>`
  ${listItemPadding};
  ${sharedWordBreakStyles};
  display: ${props => (props.isDrugInfoOpen ? "block" : "none")};
  border: ${props => props.theme.globalBorder};
  border-top: none;

  ul {
    margin-top: ${modularScale(-5)};
    padding-left: ${modularScale(2)};
  }

  strong {
    font-weight: ${props => props.theme.fontWeights.bold};
  }
`;

const SrOnlyText = styled.span`
  ${hideVisually()};
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
    <ListItem isDrugInfoOpen={isDrugInfoOpen} title={drugName}>
      <ListItemContent
        isStreetName={isStreetName}
        drugName={drugName}
        isDrugInfoOpen={isDrugInfoOpen}
        as={isStreetName ? "button" : "span"}
        onClick={isStreetName ? toggleInfoStatus : undefined}
      >
        <SrOnlyText>{referenceCount}</SrOnlyText>{" "}
        <ListItemText>{drugName}</ListItemText>{" "}
        <SrOnlyText>
          {referenceCount > 1 ? "references" : "reference"}
        </SrOnlyText>
        <DrugInfoItems>
          <Badge>{referenceCount}</Badge>
          {isStreetName && (
            <DrugInfoIcon isDrugInfoOpen={isDrugInfoOpen}>
              <SrOnlyText>Learn more about {drugName}</SrOnlyText>
            </DrugInfoIcon>
          )}
        </DrugInfoItems>
      </ListItemContent>
      {isStreetName && drugTypes && (
        <DrugInfo drugName={drugName} isDrugInfoOpen={isDrugInfoOpen}>
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
              Known as a street name for <strong>{drugTypes[0]}</strong>.
            </span>
          )}
        </DrugInfo>
      )}
    </ListItem>
  );
};

export default DrugMentionsItem;
