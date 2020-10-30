import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import "./normalise.css";
import Button from "./Button";

const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const JokeText = styled.span``;

const App = () => {
  const [isFinishedLoading, updateIsFinishedLoading] = useState(false);
  const [joke, updateJoke] = useState(null);

  useEffect(() => {
    isFinishedLoading
      ? console.log("finished loading")
      : updateIsFinishedLoading(true);
  }, [joke]);

  const fetchJoke = () => {
    updateJoke("joke");
    console.log("fetching");
  };
  return (
    <StyledApp>
      {joke ? <JokeText> {joke}</JokeText> : null}
      <Button handleClick={fetchJoke} />
    </StyledApp>
  );
};

export default App;
