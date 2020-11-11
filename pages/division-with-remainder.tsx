import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';
import { getRandomInt } from '../components/helpers';

const generateRandomQuestion = (): Question => {
  // first / second = third rm. reminder
  const second = getRandomInt(9) + 1; // to avoid division-by-zero
  const third = getRandomInt(10);
  const remainder = getRandomInt(second);
  const first = second * third + remainder;

  if (getRandomInt(2) == 0) {
    return {
      questionText: `${first} \u00F7 ${second}`,
      questionPostfix: ' =',
      result: `rm. ${remainder}`,
      answerList: ['rm. 0', 'rm. 1', 'rm. 2', 'rm. 3', 'rm. 4', 'rm. 5', 'rm. 6', 'rm. 7', 'rm. 8', 'rm. 9'],
      answered: '', // just to avoid null
      generatedAt: Date.now(),
      answeredAt: -1, // -1 just to avoid null
    };
  }

  return {
    questionText: `${first} \u00F7 ${second}`,
    questionPostfix: ' =',
    result: `${third} rm. ?`,
    answerList: [
      '0 rm. ?',
      '1 rm. ?',
      '2 rm. ?',
      '3 rm. ?',
      '4 rm. ?',
      '5 rm. ?',
      '6 rm. ?',
      '7 rm. ?',
      '8 rm. ?',
      '9 rm. ?',
    ],
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const DivisionPage = () => (
  <QuizPage
    generateRandomQuestionFunc={generateRandomQuestion}
    metaTitle="Online division with remainder quiz for kids"
    metaDesc="Online division with remainder quiz for kids helps learn basic mathematical skills."
    heading="Division with remainder quiz for kids"
  />
);

export default DivisionPage;
