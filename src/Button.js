import React from "react";
import styled from "@emotion/styled";
const StyledButton = styled.button`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  outline: none;
  background-color: tomato;
`;

const Button = ({ handleClick }) => {
  return (
    <>
      <StyledButton onClick={handleClick} />
    </>
  );
};
export default Button;
