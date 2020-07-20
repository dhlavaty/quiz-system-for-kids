import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';
import { getRandomInt } from '../components/helpers';

const generateRandomQuestion = (): Question => {
  const second = getRandomInt(9) + 1; // to avoid division-by-zero
  const result = getRandomInt(10);
  const first = second * result;

  return {
    questionText: `${first} \u00F7 ${second}`,
    result: result.toString(),
    answerList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const DivisionPage = () => (
  <QuizPage
    generateRandomQuestionFunc={generateRandomQuestion}
    metaTitle="Online division quiz for kids"
    metaDesc="Online division quiz for kids helps learn basic mathematical skills."
    heading="Division quiz for kids"
  />
);

export default DivisionPage;
