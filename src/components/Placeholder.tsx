import React from "react";
import styled, { keyframes } from "styled-components";
import { modularScale } from "polished";

type PlaceholderProps = {
  isHeader?: boolean;
}

const glowAnim = keyframes`
  0% { opacity: .1; }
  50% { opacity: .2; }
  100% { opacity: .1; }
`;
const StyledPlaceholder = styled.div<PlaceholderProps>`
  max-width: ${props => (props.isHeader ? modularScale(10) : "")};
  height: ${props => (props.isHeader ? modularScale(3) : modularScale(2))};
  margin-bottom: ${props => (props.isHeader ? modularScale(0) : "")};
  background-color: ${props => props.theme.gray};
  animation: ${glowAnim} 0.5s linear infinite;
`;

const Placeholder = ({ isHeader }: PlaceholderProps) => {
  return <StyledPlaceholder isHeader={isHeader} />;
};

export default Placeholder;
