import React from "react";
import styled from "styled-components";

type FooterProps = {
  attribution: any;
};

const StyledFooter = styled.footer``;
const Attribution = styled.p``;

const Footer = ({ attribution }: FooterProps) => {
  return (
    <StyledFooter>
      <Attribution>{attribution}</Attribution>
    </StyledFooter>
  );
};

export default Footer;
