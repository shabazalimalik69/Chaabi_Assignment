import { useState, useEffect, useRef } from "react";
import style from "./Components/Common.module.css";
import randomWords from "random-words";
import { Box, Heading } from "@chakra-ui/react";
import StartTyping from "./Components/StartTyping";
import TextArea from "./Components/TextArea";
import ShowText from "./Components/ShowText";




const fixTime = (time) => (time < 10 ? "0" + time : time);

const formatTimeToStr = (time) => {
  const seconds = time % 60;
  const min = Math.floor(time / 60) % 60;
  return `${fixTime(min)}:${fixTime(seconds)}`;
};

function App() {
  const [words, setWords] = useState([]);
  const [time, setCountDown] = useState(300);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);
  const id = useRef(null);
  
  const num_of_words = 300;

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  function generateWords() {
    return new Array(num_of_words).fill(null).map(() => randomWords());
  }

  function handleStart() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }

    if (status !== "started") {
      setStatus("started");

      if (!id.current) {
        id.current = setInterval(() => {
          setCountDown((time) => {
            if (time <= 0) {
              clearInterval(id.current);
              setStatus("finished");
              setCurrInput("");
              return 0;
            } else {
              return time - 1;
            }
          });
        }, 1000);
      }
    }
  }

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else {
      return "";
    }
  }

  return (
    <Box className={style.container}>
       <Box>
        <Heading textAlign="center" mt="20px" mb="20px">
          {"Timer: " + formatTimeToStr(time) + " mins"}
        </Heading>
      </Box>

      <ShowText
        status={status}
        words={words}
        correct={correct}
        incorrect={incorrect}
        getCharClass={getCharClass}
      />

      <Box >
        <TextArea
          textInput={textInput}
          handleKeyDown={handleKeyDown}
          currInput={currInput}
          setCurrInput={setCurrInput}
        />
      </Box>
      <StartTyping handleStart={handleStart} />
    </Box>
  );
}

export default App;
