import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import think from "./fact.svg";
import xmasthink from "./xmasfact.svg";
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(370deg);
  }
`;
const FactLogo = styled.img`
  animation: ${rotate360} 1s linear;
  height: 265px;
  cursor: pointer;
  margin: 10px;
  outline: none;
`;

const XmasFactLogo = styled.img`
  animation: ${rotate360} 1s linear;
  height: 300px;
  cursor: pointer;
  margin: 10px;
  outline: none;
`;

const FactButton = ({ handleClick, xmas }) => {
  return (
    <>
      {xmas ? (
        <XmasFactLogo onClick={handleClick} src={xmasthink} />
      ) : (
        <FactLogo onClick={handleClick} src={think} />
      )}
    </>
  );
};
export default FactButton;
