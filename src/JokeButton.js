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
const JokeLogo = styled.img`
  animation: ${rotate360} 1s linear;
  height: 300px;
  cursor: pointer;
  margin: 10px;
  outline: none;
`;

const JokeButton = ({ handleClick }) => {
  return (
    <>
      <JokeLogo onClick={handleClick} src={laugh} />
    </>
  );
};
export default JokeButton;
