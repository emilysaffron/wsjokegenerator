import React from "react";
import { ReactComponent as Mute } from "./mute.svg";

const MuteButton = ({ handleClick }) => {
  return (
    <Mute
      fill="red"
      width="200px"
      onClick={handleClick}
      cursor="pointer"
      outline="none"
    />
  );
};

export default MuteButton;
