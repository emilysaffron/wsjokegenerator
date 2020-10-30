import React, { componentDidMount, useState, useEffect } from "react";
import { useRef } from "react";
import audio from "./airhorn.m4a";
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
const JokeText = styled.span`
  text-align: center;
`;

const App = () => {
  const [isFinishedLoading, updateIsFinishedLoading] = useState(false);
  const [joke, updateJoke] = useState(null);
  const audioElementRef = useRef(null);

  /*  this caused an infinite loop lol
  useEffect(() => {
    isFinishedLoading ? fetchJoke() : updateIsFinishedLoading(true);
  }, [joke]); */

  const fetchJoke = async () => {
    const url = "https://icanhazdadjoke.com";
    const options = {
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const audio = audioElementRef.current;

    audio.play();
    updateJoke(data.joke);
  };
  return (
    <StyledApp>
      {joke ? <JokeText> {joke}</JokeText> : null}
      <br />
      <audio ref={audioElementRef} src={audio} />
      <Button handleClick={fetchJoke} />
    </StyledApp>
  );
};

export default App;
