import React, { useState } from "react";
import { useRef } from "react";
import audio from "./airhorn.m4a";
import styled from "@emotion/styled";
import "./normalise.css";
import Button from "./Button";
import laugh from "./laugh.svg";
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

const StyledLaugh = styled.img`
  height: 300px;
  cursor: pointer;
`;

const App = () => {
  const [joke, updateJoke] = useState(null);
  const audioElementRef = useRef(null);
  const [spin, updateSpin] = useState(false);
  /*  this caused an infinite loop lol

  useEffect(() => {
    isFinishedLoading ? fetchJoke() : updateIsFinishedLoading(true);
  }, [joke]); */

  const fetchJoke = async () => {
    updateSpin(true);
    const audio = audioElementRef.current;
    audio.pause();
    audio.currentTime = 0;

    const url = "https://icanhazdadjoke.com";
    const options = {
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    audio.play();
    updateJoke(data.joke);
    setTimeout(setStill, 900);
  };

  const setStill = () => {
    updateSpin(false);
  };
  return (
    <StyledApp>
      {joke ? <JokeText> {joke}</JokeText> : null}
      <br />
      <audio ref={audioElementRef} src={audio} />
      {spin ? (
        <Button handleClick={fetchJoke} />
      ) : (
        <StyledLaugh src={laugh} onClick={fetchJoke} />
      )}
    </StyledApp>
  );
};

export default App;
