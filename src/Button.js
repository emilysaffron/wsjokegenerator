import React from "react";
import styled from "@emotion/styled";
const StyledButton = styled.button`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  outline: none;
  background-color: red;
`;

const Button = ({ handleClick }) => {
  return (
    <>
      <StyledButton onClick={handleClick} />
    </>
  );
};
export default Button;
