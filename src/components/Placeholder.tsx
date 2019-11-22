import React from "react";
import styled, { keyframes } from "styled-components";
import { modularScale } from "polished";

type PlaceholderProps = {
  isHeader?: boolean;
  width?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
};

const glowAnim = keyframes`
  0% { opacity: .1; }
  50% { opacity: .2; }
  100% { opacity: .1; }
`;
const StyledPlaceholder = styled.div<PlaceholderProps>`
  max-width: ${props => (props.width ? props.width : "")};
  height: ${props => (props.isHeader ? modularScale(3) : props.height ? props.height : modularScale(2))};
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "")};
  background-color: ${props => props.theme.gray};
  animation: ${glowAnim} 0.5s linear infinite;
`;

const Placeholder = ({
  isHeader,
  width,
  height,
  marginTop,
  marginBottom
}: PlaceholderProps) => {
  return (
    <StyledPlaceholder
      isHeader={isHeader}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
    />
  );
};

export default Placeholder;
