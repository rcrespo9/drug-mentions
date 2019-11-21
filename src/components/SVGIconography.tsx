import React from "react";
import styled from "styled-components";

const SVG = styled.svg.attrs(props => ({
  xmlns: "http://www.w3.org/2000/svg"
}))`
  display: none;
`;

const SVGIconography = () => {
  return (
    <SVG>
      <symbol id="icon-reload" viewBox="0 0 20 20">
        <title>reload</title>
        <path d="M14.66 15.66c-1.448 1.45-3.449 2.346-5.66 2.346-4.418 0-8-3.582-8-8s3.582-8 8-8c4.416 0 7.996 3.578 8 7.993v0h-2c0-0.002 0-0.003 0-0.005 0-3.314-2.686-6-6-6s-6 2.686-6 6c0 3.314 2.686 6 6 6 1.656 0 3.154-0.671 4.24-1.755l-0 0 1.42 1.42zM12 10h8l-4 4-4-4z"></path>
      </symbol>
      <symbol id="icon-search" viewBox="0 0 20 20">
        <title>search</title>
        <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"></path>
      </symbol>
    </SVG>
  );
};

export default SVGIconography;
