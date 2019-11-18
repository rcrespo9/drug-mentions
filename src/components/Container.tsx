import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type ContainerProps = {
  children: any;
  tag?: any;
};

const StyledContainer = styled.article`
  border: 2px solid ${props => props.theme.white};
`;

const Container = ({ children, tag }: ContainerProps) => {
  return <StyledContainer as={tag}>{children}</StyledContainer>;
};

export default Container;
