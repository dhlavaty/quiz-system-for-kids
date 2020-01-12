import React, { useState } from "react";
import cloneDeep from "clone-deep";

import Footer from "../components/footer";
import Header from "../components/header";

const generateRandomQuestion = () => {
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const first = getRandomInt(10);
  const second = getRandomInt(10);

  // generate answerList
  let al = [];
  al.push(first * second);
  al.push(Math.abs(first * second - 1));
  al.push(Math.abs(first * second + 1));
  al.push(Math.abs((first - 1) * second));
  al.push(Math.abs((first + 1) * second));
  al.push(Math.abs(first * (second - 1)));
  al.push(Math.abs(first * (second + 1)));
  al.push(Math.abs((first - 1) * (second + 1)));
  al.push(Math.abs((first + 1) * (second - 1)));
  al.push(getRandomInt(100));
  al.push(getRandomInt(100));
  // remove duplicates
  const answerList = al.filter((v, i) => al.indexOf(v) === i);
  answerList.sort((a, b) => a - b);

  return {
    first,
    second,
    result: first * second,
    answerList,
    answered: -1, // -1 just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1 // -1 just to avoid null
  };
};

function HomePage() {
  const [question, setQuestion] = useState(generateRandomQuestion());
  const [history, setHistory] = useState([]);

  const handleClick = clickedNumber => {
    question.answered = clickedNumber;
    question.answeredAt = Date.now();
    setHistory([cloneDeep(question), ...history]);
    setQuestion(generateRandomQuestion());
  };

  const buttons = question.answerList.map(a => (
    <button
      key={a}
      style={{ fontSize: "4rem" }}
      className="large shadowed"
      onClick={() => {
        handleClick(a);
      }}
    >
      {a}
    </button>
  ));

  const TimeDiff = props => (
    <span style={{ color: "gray", margin: "0.5rem" }}>
      {Math.round(
        ((props.question.answeredAt - props.question.generatedAt) / 1000) * 10
      ) / 10}{" "}
      seconds
    </span>
  );

  const HistoryLine = props => {
    const q = props.question;

    if (q.answered === q.result) {
      return (
        <div style={{ color: "green" }}>
          {q.first} &#215; {q.second} ={" "}
          {props.hasToDisplayCorrectAnswer ? q.result : "?"} GOOD
          <TimeDiff question={props.question} />
        </div>
      );
    }

    return (
      <div style={{ color: "red" }}>
        {q.first} &#215; {q.second} &ne;{" "}
        {props.hasToDisplayCorrectAnswer ? q.answered : "?"}
        <span style={{ color: "green" }}>
          {" "}
          = {props.hasToDisplayCorrectAnswer ? q.result : "?"}
        </span>{" "}
        BAD
        <TimeDiff question={props.question} />
      </div>
    );
  };

  const HistoryList = props =>
    props.history.slice(0, 150).map((m, i) => {
      if ((i + 1) % 5 === 0) {
        return (
          <React.Fragment key={m.generatedAt}>
            <HistoryLine
              key={m.generatedAt}
              question={m}
              hasToDisplayCorrectAnswer={i < 5}
            />
            <br />
          </React.Fragment>
        );
      }

      return (
        <HistoryLine
          key={m.generatedAt}
          question={m}
          hasToDisplayCorrectAnswer={i < 5}
        />
      );
    });

  return (
    <>
      <Header
        metaTitle="Online multiplication quiz for kids"
        metaDesc="Online multiplication quiz for kids helps learn basic mathematical skills."
        heading="Multiplication quiz for kids"
      />

      <p style={{ fontSize: "6em" }}>
        {question.first} &#215; {question.second} =
      </p>

      {buttons}

      <h2>
        History
        <small>
          <span style={{ color: "green" }}>
            {`good: ${history.reduce(
              (acc, c) => (c.result === c.answered ? acc + 1 : acc),
              0
            )} `}
          </span>
          <span style={{ color: "red" }}>
            {`bad: ${history.reduce(
              (acc, c) => (c.result !== c.answered ? acc + 1 : acc),
              0
            )} `}
          </span>
          <span>{`total: ${history.length} `}</span>
          <span style={{ color: "green" }}>
            {`last ${
              history.findIndex(c => c.result !== c.answered) < 0
                ? history.length
                : history.findIndex(c => c.result !== c.answered)
            } was good`}
          </span>
        </small>
      </h2>

      <div>
        <HistoryList history={history} />
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
