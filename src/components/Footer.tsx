import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

const StyledFooter = styled.footer`
  padding: ${modularScale(5)} 0 ${modularScale(2)};
  text-align: center;
`;
const Attribution = styled.p`
  font-size: ${modularScale(1)};
`;

const Link = styled.a.attrs(props => ({
  target: "_blank",
  rel: "nofollow noopener"
}))`
  text-decoration: underline;
  transition: color 0.25s ease-in-out;

  &:hover,
  &:focus {
    color: ${props => props.theme.deepSaffron};
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Attribution>Built using the <Link href="https://docs.genius.com">Genius API</Link> by <Link href="https://rudycrespo.com">Rudy Crespo</Link></Attribution>
    </StyledFooter>
  );
};

export default Footer;
