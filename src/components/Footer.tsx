import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

type FooterProps = {
  attribution: any;
};

const StyledFooter = styled.footer`
  padding: ${modularScale(5)} 0 ${modularScale(2)};
  text-align: center;
`;
const Attribution = styled.p`
  font-size: ${modularScale(1)};
`;

const Footer = ({ attribution }: FooterProps) => {
  return (
    <StyledFooter>
      <Attribution>{attribution}</Attribution>
    </StyledFooter>
  );
};

export default Footer;
