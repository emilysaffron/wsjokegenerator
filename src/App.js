import React, { useState } from "react";
import { useRef } from "react";
import audio from "./airhorn.m4a";
import wow from "./wow.mp3";
import santa from "./santa.mp3";
import bells from "./bells.mp3";
import styled from "@emotion/styled";
import "./normalise.css";
import JokeButton from "./JokeButton";
import FactButton from "./FactButton";
import MuteButton from "./Mute";
import muted from "./mute.svg";
import laugh from "./laugh.svg";
import elflaugh from "./elflaugh.svg";
import xmasthink from "./xmasfact.svg";
import think from "./fact.svg";
import bell from "./bell.png";
import lights from "./lights.png";
import tree from "./xmastree.png";

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

const XmasApp = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`;

const JokeText = styled.span`
  text-align: center;
  padding: 10px;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const FactText = styled.span`
  text-align: center;
  padding: 10px;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const StyledLaugh = styled.img`
  height: 300px;
  cursor: pointer;
  margin: 10px;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const StyledThink = styled.img`
  height: 265px;
  cursor: pointer;
  margin: 10px;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const StyledXmas = styled.img`
  height: 300px;
  cursor: pointer;
  margin: 10px;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const StyledButton = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const StyledBell = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const FaceDiv = styled.div`
  display: flex;
  align-items: inherit;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const XmasStuff = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StyledLights = styled.div`
  display: flex;
`;
const StyledTree = styled.div`
  align-self: baseline;
`;
const StyledH = styled.h2`
  margin: 0px;
  padding: 0px;
`;
const App = () => {
  const [joke, updateJoke] = useState(null);
  const [fact, updateFact] = useState(null);
  const audioElementRef = useRef(null);
  const factElementRef = useRef(null);
  const [jokeSpin, updateJokeSpin] = useState(false);
  const [factSpin, updateFactSpin] = useState(false);
  const [mute, updateMute] = useState(false);
  const [xmas, toggleXmas] = useState(false);
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

  const [days, updateDays] = useState(0);

  const [december, updateDecember] = useState(true);
  const [thisYear, updateThisYear] = useState(true);

  const updateXmas = () => {
    toggleXmas(!xmas);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    let xmasD = "25";
    let xmasM = "12";
    let xmasY = yyyy;

    //xmas has happened this year
    if (mm === xmasM && dd > xmasD) {
      updateThisYear(false);
    }

    //its not xmas month yet
    if (mm !== xmasM) {
      updateDecember(false);
    }

    if (thisYear && december) {
      updateDays(25 - parseInt(dd));
    }
  };

  return xmas ? (
    <XmasApp>
      {joke ? <JokeText> {joke}</JokeText> : null}
      {fact ? <FactText>{fact}</FactText> : null}
      <StyledLights>
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
        <img
          alt="lights"
          src={lights}
          margin="0px"
          padding="0px"
          height="100px"
          width="100px"
        />
      </StyledLights>
      <br />
      <audio ref={audioElementRef} src={santa} />
      <audio ref={factElementRef} src={bells} />
      <FaceDiv>
        {jokeSpin ? (
          <JokeButton handleClick={fetchJoke} xmas={xmas} />
        ) : (
          <StyledXmas src={elflaugh} onClick={fetchJoke} />
        )}
        <br />
        <br />
        {factSpin ? (
          <FactButton handleClick={fetchFact} xmas={xmas} />
        ) : (
          <StyledXmas src={xmasthink} onClick={fetchFact} />
        )}
      </FaceDiv>
      <StyledH>There are {days} day(s) until Christmas!</StyledH>
      <XmasStuff>
        <StyledTree>
          {" "}
          <img src={tree} alt="xmas tree" height="250px" width="150px" />
        </StyledTree>

        <Buttons>
          {mute ? (
            <MuteButton handleClick={setMute} />
          ) : (
            <StyledButton src={muted} onClick={setMute} />
          )}
          <StyledBell src={bell} alt="xmas mode button" onClick={updateXmas} />
        </Buttons>
        <StyledTree>
          {" "}
          <img src={tree} alt="xmas tree" height="250px" width="150px" />
        </StyledTree>
      </XmasStuff>
    </XmasApp>
  ) : (
    <StyledApp>
      {joke ? <JokeText> {joke}</JokeText> : null}
      {fact ? <FactText>{fact}</FactText> : null}
      <br />
      <audio ref={audioElementRef} src={audio} />
      <audio ref={factElementRef} src={wow} />
      <FaceDiv>
        {jokeSpin ? (
          <JokeButton handleClick={fetchJoke} xmas={xmas} />
        ) : (
          <StyledLaugh src={laugh} onClick={fetchJoke} />
        )}
        <br />
        <br />
        {factSpin ? (
          <FactButton handleClick={fetchFact} xmas={xmas} />
        ) : (
          <StyledThink src={think} onClick={fetchFact} />
        )}
      </FaceDiv>
      <Buttons>
        {mute ? (
          <MuteButton handleClick={setMute} />
        ) : (
          <StyledButton src={muted} onClick={setMute} />
        )}
        <StyledBell src={bell} alt="xmas mode button" onClick={updateXmas} />
      </Buttons>
    </StyledApp>
  );
};

export default App;
