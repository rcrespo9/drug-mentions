import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import DrugReferences from "../types_interfaces/DrugReferences";

import Block from "./Block";

const DrugMentions = ({ totalReferences, references }: DrugReferences) => {
  return (
    <Block
      as="aside"
      header={`${totalReferences} possible drug references found`}
      boxShadowColor="purple"
      hasPadding={true}
    />
  );
};

export default DrugMentions;
