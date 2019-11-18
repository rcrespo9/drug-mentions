import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type ContainerProps = {
  children: any;
  boxShadowColor: string;
  tag?: any;
};

const StyledContainer = styled.article<ContainerProps>`
  position: relative;
  border: 2px solid ${props => props.theme.white};

  &:after {
    content: "";
    background-color: ${props => props.boxShadowColor};
  }
`;

const Container = ({ children, tag, boxShadowColor }: ContainerProps) => {
  return (
    <StyledContainer as={tag} boxShadowColor={boxShadowColor}>
      {children}
    </StyledContainer>
  );
};

export default Container;
