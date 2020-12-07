import React from "react";
import { ReactComponent as Mute } from "./mute.svg";

const MuteButton = ({ handleClick }) => {
  return (
    <Mute
      fill="red"
      width="100px"
      height="100px"
      onClick={handleClick}
      cursor="pointer"
      outline="none"
    />
  );
};

export default MuteButton;
