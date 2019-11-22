import React from "react";
import styled, { keyframes } from "styled-components";
import { modularScale } from "polished";

type PlaceholderProps = {
  isHeader?: boolean;
}

const glowAnim = keyframes`
  0% { opacity: .1; }
  50% { opacity: .2; }
  100% { opacity: .3; }
`;
const StyledPlaceholder = styled.div<PlaceholderProps>`
  height: ${props => props.isHeader ? modularScale(2) : modularScale(1) };
  background-color: ${props => props.theme.gray};
  animation: ${glowAnim} 1s linear;
`;

const Placeholder = ({ isHeader }: PlaceholderProps) => {
  return <StyledPlaceholder isHeader={isHeader} />;
};

export default Placeholder;
