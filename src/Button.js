import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import laugh from "./laugh.svg";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AppLogo = styled.img`
  animation: ${rotate360} 1s linear;
  height: 300px;
  cursor: pointer;
`;

const Button = ({ handleClick }) => {
  return (
    <>
      <AppLogo onClick={handleClick} src={laugh} /> 
    </>
  );
};
export default Button;
