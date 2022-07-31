import { useState, useEffect } from "react";
import "./App.css";
import Blob from "./assets/blob.png";
import Blob2 from "./assets/blob2.png";
import Question from "./components/question.jsx";

function App() {
  const [firstGame, setFirstGame] = useState(true);
  const [allOptions, setAllOptions] = useState(
    Array(5).fill(Array(4).fill(null)) // [[null, null, null, null] * 5]
  );
  const [selected, setSelected] = useState(Array(5).fill(null));
  const [allData, setAllData] = useState([]);
  const [shouldCheck, setShouldCheck] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [score, setScore] = useState();

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
      console.log("Fetching from API...");
      fetch("https:opentdb.com/api.php?amount=5")
        .then((data) => data.json())
        .then((json) => setAllData(json.results));
      console.log("Fetched Data");
    }
  }, [shouldFetch]);

  useEffect(() => {
    setAllOptions((prevAllOptions) => {
      let newAllOptions = allData.map((question) => {
        let incorrect = question.incorrect_answers;
        let correct = question.correct_answer;
        return shuffleArray(
          incorrect
            .map((answer) => decodeHTML(answer))
            .concat(decodeHTML(correct))
        );
      });
      return newAllOptions.length === 0 ? prevAllOptions : newAllOptions;
    });
    console.log("Options initialized");
  }, [allData]);

  function decodeHTML(string) {
    let doc = new DOMParser().parseFromString(string, "text/html");
    return doc.documentElement.textContent;
  }

  // Durstenfeld shuffle
  function shuffleArray(array) {
    let arr = array.slice(0); // Make a copy
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function select(questionId) {
    return (optionId) => {
      setSelected((prevSelected) => {
        let arr = prevSelected.slice(0); // .slice(0) IS VERY IMPORTANT
        arr[questionId] = optionId;
        return arr;
      });
    };
  }

  function checkAnswers() {
    setShouldCheck(true);
    setScore(() => {
      let newScore = 0;
      for (let id = 0; id < allData.length; id++) {
        const question = allData[id];
        if (allOptions[id][selected[id]] === question.correct_answer) {
          newScore++;
        }
      }
      return newScore;
    });
  }

  function startNewGame() {
    setShouldCheck(false);
    setShouldFetch(true);
    setSelected(Array(5).fill(null));
  }

  let questionElems = allData.map((question, id) => {
    return (
      <Question
        key={id}
        id={id}
        text={decodeHTML(question.question)}
        options={allOptions[id]}
        incorrect={question.incorrect_answers}
        correct={decodeHTML(question.correct_answer)}
        select={select(id)}
        selectedOption={selected[id]}
        shouldCheck={shouldCheck}
      />
    );
  });

  return (
    <>
      <img className="blob" src={Blob} alt="" />
      <img className="blob2" src={Blob2} alt="" />
      {firstGame ? (
        <div className="starter-screen">
          <h1 className="starter--title">Quizzical</h1>
          <h2 className="starter--description">
            How good are you at trivia? Let's find out...
          </h2>
          <button
            className="starter--start"
            onClick={() => setFirstGame(false)}
          >
            Start quiz
          </button>
        </div>
      ) : (
        <div className="main">
          <div className="questions">{questionElems}</div>
          <div className="results">
            {shouldCheck && (
              <span className="score">
                You scored {score}/5 correct answers
              </span>
            )}
            <button
              className="check-answers"
              onClick={shouldCheck ? startNewGame : checkAnswers}
            >
              {shouldCheck ? "Play Again" : "Check answers"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
