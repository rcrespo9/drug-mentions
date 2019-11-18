import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type BlockProps = {
  children?: any;
  boxShadowColor: string;
  as?: any;
};

const StyledBlock = styled.article<BlockProps>`
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.theme.white};
  }

  &:before {
    top: 0;
    left: 0;
    z-index: 1;
    background-color: ${props => props.theme.black};
  }

  &:after {
    top: ${modularScale(-2)};
    left: ${modularScale(-2)};
    z-index: -1;
    background-color: ${props => props.boxShadowColor};
  }
`;

const InnerBlock = styled.div`
  position: relative;
  z-index: 2;
`;

const Block = ({
  children,
  as,
  boxShadowColor,
}: BlockProps) => {
  return (
    <StyledBlock
      as={as}
      boxShadowColor={boxShadowColor}
    >
      <InnerBlock>{children}</InnerBlock>
    </StyledBlock>
  );
};

export default Block;
