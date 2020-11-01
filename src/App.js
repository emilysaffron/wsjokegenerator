import React, { useState } from "react";
import { useRef } from "react";
import audio from "./airhorn.m4a";
import wow from "./wow.mp3";
import styled from "@emotion/styled";
import "./normalise.css";
import JokeButton from "./JokeButton";
import FactButton from "./FactButton";
import MuteButton from "./Mute";
import muted from "./mute.svg";
import laugh from "./laugh.svg";
import think from "./fact.svg";
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
  padding: 10px;
`;

const FactText = styled.span`
  text-align: center;
  padding: 10px;
`;

const StyledLaugh = styled.img`
  height: 300px;
  cursor: pointer;
  margin: 10px;
`;

const StyledThink = styled.img`
  height: 265px;
  cursor: pointer;
  margin: 10px;
`;

const StyledMute = styled.img`
  width: 200px;
  cursor: pointer;
`;

const FaceDiv = styled.div`
  display: flex;
  align-items: inherit;
`;

const App = () => {
  const [joke, updateJoke] = useState(null);
  const [fact, updateFact] = useState(null);
  const audioElementRef = useRef(null);
  const factElementRef = useRef(null);
  const [jokeSpin, updateJokeSpin] = useState(false);
  const [factSpin, updateFactSpin] = useState(false);
  const [mute, updateMute] = useState(false);
  /*  this caused an infinite loop lol

  useEffect(() => {
    isFinishedLoading ? fetchJoke() : updateIsFinishedLoading(true);
  }, [joke]); */

  const fetchJoke = async () => {
    setFactStill();
    updateJokeSpin(true);
    if (factElementRef) {
      factElementRef.current.pause();
      factElementRef.current.currentTime = 0;
    }
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
    if (!mute) {
      audio.play();
    }
    updateJoke(data.joke);
    updateFact(null);
    setTimeout(setJokeStill, 900);
  };

  const setJokeStill = () => {
    updateJokeSpin(false);
  };

  const setFactStill = () => {
    updateFactSpin(false);
  };

  const fetchFact = async () => {
    setJokeStill();
    updateFactSpin(true);
    if (audioElementRef) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    const wow = factElementRef.current;
    wow.pause();
    wow.currentTime = 0;

    const url = "https://uselessfacts.jsph.pl/random.json?language=en";

    const response = await fetch(url);
    const data = await response.json();
    if (!mute) {
      wow.play();
    }
    updateFact(data.text);
    updateJoke(null);
    setTimeout(setFactStill, 900);
  };

  const setMute = () => {
    if (audioElementRef) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    if (factElementRef) {
      factElementRef.current.pause();
      factElementRef.current.currentTime = 0;
    }
    updateMute(!mute);
  };

  return (
    <StyledApp>
      {joke ? <JokeText> {joke}</JokeText> : null}
      {fact ? <FactText>{fact}</FactText> : null}
      <br />
      <audio ref={audioElementRef} src={audio} />
      <audio ref={factElementRef} src={wow} />

      <FaceDiv>
        {jokeSpin ? (
          <JokeButton handleClick={fetchJoke} />
        ) : (
          <StyledLaugh src={laugh} onClick={fetchJoke} />
        )}
        <br />
        <br />
        {factSpin ? (
          <FactButton handleClick={fetchFact} />
        ) : (
          <StyledThink src={think} onClick={fetchFact} />
        )}
      </FaceDiv>
      {mute ? (
        <MuteButton handleClick={setMute} />
      ) : (
        <StyledMute src={muted} onClick={setMute} />
      )}
    </StyledApp>
  );
};

export default App;
