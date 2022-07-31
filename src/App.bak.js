// TODO: UPDATE (UN)SELECTED CLASS IN QUESTION

import { useState } from "react";
import "./App.css";
import Blob from "./assets/blob.png";
import Question from "./components/question.jsx";
import Data from "./data.jsx";

function App() {
  const [starter, setStarter] = useState(true);
  const [selected, setSelected] = useState(
    // Array(5).fill(null)
    [1, 1, 1, 1, 1]
  );

  // In format [0, 1, 1, 3, 2]
  // Each element is a question, and the value is from 0 to 3
  // stating the option selected
  function select(question) {
    return (option) => {
      setSelected((prevSelected) => {
        let arr = prevSelected;
        arr[question] = option;
        return arr;
      });
      // console.log(selected);
    };
  }

  let questionElems = Data.results.map((question, i) => {
    return (
      <Question
        key={question.question}
        id={i}
        question={question}
        select={select(i)}
        selectedOption={selected[i]}
      />
    );
  });

  return (
    <>
      <img className="blob" src={Blob} />
      {
        /* starter ? ( */
        /*   <div className="starter-screen"> */
        /*     <h1 className="starter--title">Quizzical</h1> */
        /*     <h2 className="starter--description"> */
        /*       How good are you at trivia? Let's find out... */
        /*     </h2> */
        /*     <button className="starter--start" onClick={() => setStarter(false)}> */
        /*       Start quiz */
        /*     </button> */
        /*   </div> */
        /* ) : ( */
        <div className="main">
          <div className="questions">{questionElems}</div>
          <button className="check-answers">Check answers</button>
        </div>
        /* ) */
      }
    </>
  );
}

export default App;
