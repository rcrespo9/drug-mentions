import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type BlockProps = {
  header?: string;
  children?: any;
  boxShadowColor: string;
  as?: any;
  hasPadding?: boolean;
};

type InnerBlockProps = {
  hasPadding?: boolean;
}

const StyledBlock = styled.div<BlockProps>`
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: ${props => props.theme.globalBorder};
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

const InnerBlock = styled.div<InnerBlockProps>`
  position: relative;
  z-index: 2;
  padding: ${props => (props.hasPadding ? modularScale(3) : "")};
`;

const Header = styled.h2`
  margin-bottom: ${modularScale(1)};
  font-size: ${modularScale(2)};
`;

const Block = ({ children, header, as, boxShadowColor, hasPadding }: BlockProps) => {
  return (
    <StyledBlock as={as} boxShadowColor={boxShadowColor}>
      <InnerBlock hasPadding={hasPadding}>
        {header &&
          <Header>{header}</Header>
        }
        {children}
      </InnerBlock>
    </StyledBlock>
  );
};

export default Block;
