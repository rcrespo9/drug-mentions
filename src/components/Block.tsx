import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type BlockProps = {
  children?: any;
  boxShadowColor: string;
  as?: any;
  hasBoxProps?: boolean;
};

const StyledBlock = styled.article<BlockProps>`
  position: relative;
  z-index: 1;
  border: ${props => (props.hasBoxProps ? props.theme.globalBorder : "")};
  padding: ${props => (props.hasBoxProps ? props.theme.globalPadding : "")};

  &:after {
    content: "";
    position: absolute;
    top: ${modularScale(-2)};
    left: ${modularScale(-2)};
    z-index: -1;
    width: 100%;
    height: 100%;
    border: ${props => props.theme.globalBorder};
    background-color: ${props => props.boxShadowColor};
  }
`;

const Block = ({
  children,
  as,
  boxShadowColor,
  hasBoxProps
}: BlockProps) => {
  return (
    <StyledBlock
      as={as}
      boxShadowColor={boxShadowColor}
      hasBoxProps={hasBoxProps}
    >
      {children}
    </StyledBlock>
  );
};

export default Block;
