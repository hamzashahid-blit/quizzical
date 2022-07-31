import React from "react";

function Question(props) {
  const optionElems = props.options.map((option, id) => {
    const isSelected = props.selectedOption === id;
    const isCorrect = props.correct === option;
    const classes = "answer " + (isSelected ? "selected" : "unselected");
    let style = props.shouldCheck
      ? isCorrect
        ? {
            backgroundColor: "#94D7A2",
            border: "1px solid #94D7A2",
          }
        : isSelected
        ? {
            backgroundColor: "#F8BCBC",
            border: "1px solid #F8BCBC",
            opacity: "50%",
          }
        : { opacity: "50%" }
      : null;
    return (
      <button
        key={[props.id, id]}
        className={classes}
        style={style}
        onClick={!props.shouldCheck ? () => props.select(id) : undefined}
      >
        {option}
      </button>
    );
  });

  return (
    <div className="question">
      <h1 className="question--text">{props.text}</h1>
      {optionElems}
      <hr />
    </div>
  );
}

export default Question;
