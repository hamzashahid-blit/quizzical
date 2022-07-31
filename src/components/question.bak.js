import React, { useEffect } from "react";

function Question(props) {
  let data = props.question;
  const [options, setOptions] = React.useState(randomizeOptions());
  // const [optionElems, setOptionElems] = React.useState();

  // React.useEffect(() => {
  //   setOptionElems(() => {
  //     options.map((option, i) => {
  //       let selected = props.selectedOption === i;
  //       return (
  //         <button
  //           key={i}
  //           id={i * props.id}
  //           className={"answer " + (selected ? "selected" : "unselected")}
  //           onClick={() => props.select(i)}
  //         >
  //           {option}
  //         </button>
  //       );
  //     });
  //   });

  //   console.log(optionElems);
  // }, [options, props]);

  // Durstenfeld shuffle
  function shuffleArray(array) {
    let arr = array.slice(0); // Make a copy
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Shuffle all options
  function randomizeOptions() {
    return shuffleArray(data.incorrect_answers.concat(data.correct_answer));
  }

  let optionElems2 = options.map((option, i) => {
    let selected = props.selectedOption === i;
    return (
      <button
        key={i}
        id={i * props.id}
        className={"answer " + (selected ? "selected" : "unselected")}
        onClick={() => props.select(i)}
      >
        {option}
      </button>
    );
  });

  return (
    <div className="question">
      <h1 className="question--text">{data.question}</h1>
      {optionElems2}
      {/* <button className="answer selected">Venus</button> */}
      {/* <button className="answer unselected">Mars</button> */}
      {/* <button className="answer unselected">Saturn</button> */}
    </div>
  );
}

export default Question;
