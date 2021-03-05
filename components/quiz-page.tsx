import React, { useState } from 'react';
import cloneDeep from 'clone-deep';

import Header, { HeaderPropsType } from './header';
import Footer from './footer';

import { Question } from './question';

export const QuizPage = (props: { generateRandomQuestionFunc: () => Question } & HeaderPropsType) => {
  const [question, setQuestion] = useState(props.generateRandomQuestionFunc());
  const [history, setHistory] = useState([] as Question[]);

  const handleClick = (clickedAnswer: string) => {
    question.answered = clickedAnswer;
    question.answeredAt = Date.now();
    setHistory([cloneDeep(question), ...history]);
    setQuestion(props.generateRandomQuestionFunc());
  };

  const buttons = question.answerList.map((a) => (
    <button
      key={a}
      style={{ fontSize: '4rem' }}
      className="large shadowed"
      onClick={() => {
        handleClick(a);
      }}
    >
      {a}
    </button>
  ));

  const TimeDiff = (props: { question: Question }) => (
    <span style={{ color: 'gray', margin: '0.5rem' }}>
      {Math.round(((props.question.answeredAt - props.question.generatedAt) / 1000) * 10) / 10} seconds
    </span>
  );

  const HistoryLine = (props: { question: Question; hasToDisplayCorrectAnswer: boolean }) => {
    const q = props.question;

    if (q.answered === q.result) {
      return (
        <div style={{ color: 'green' }}>
          {q.questionText} = {props.hasToDisplayCorrectAnswer ? q.result : '?'} GOOD
          <TimeDiff question={props.question} />
        </div>
      );
    }

    return (
      <div style={{ color: 'red' }}>
        {q.questionText} &ne; {props.hasToDisplayCorrectAnswer ? q.answered : '?'}
        <span style={{ color: 'green' }}> = {props.hasToDisplayCorrectAnswer ? q.result : '?'}</span> BAD
        <TimeDiff question={props.question} />
      </div>
    );
  };

  const HistoryList = (props: { history: Question[] }) => {
    return (
      <div>
        {props.history.slice(0, 150).map((m, i) => {
          if ((i + 1) % 5 === 0) {
            return (
              <React.Fragment key={m.generatedAt}>
                <HistoryLine key={m.generatedAt} question={m} hasToDisplayCorrectAnswer={i < 5} />
                <br />
              </React.Fragment>
            );
          }

          return <HistoryLine key={m.generatedAt} question={m} hasToDisplayCorrectAnswer={i < 5} />;
        })}
      </div>
    );
  };

  return (
    <>
      <Header metaTitle={props.metaTitle} metaDesc={props.metaDesc} heading={props.heading} />

      <p style={{ fontSize: '6em' }}>
        {question.questionText}
        {question.questionPostfix}
      </p>

      {buttons}

      <h2>
        History
        <small>
          <span style={{ color: 'green' }}>
            {`good: ${history.reduce((acc, c) => (c.result === c.answered ? acc + 1 : acc), 0)} `}
          </span>
          <span style={{ color: 'red' }}>
            {`bad: ${history.reduce((acc, c) => (c.result !== c.answered ? acc + 1 : acc), 0)} `}
          </span>
          <span>{`total: ${history.length} `}</span>
          <span style={{ color: 'green' }}>
            {`last ${
              history.findIndex((c) => c.result !== c.answered) < 0
                ? history.length
                : history.findIndex((c) => c.result !== c.answered)
            } was good`}
          </span>
        </small>
      </h2>

      <HistoryList history={history} />

      <Footer />
    </>
  );
};
