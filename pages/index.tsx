import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';
import { getRandomInt, removeDuplicates, toStringArray, sortArray } from '../components/helpers';

const generateRandomDivisionQuestion = (): Question => {
  const second = getRandomInt(9) + 1; // to avoid division-by-zero
  const result = getRandomInt(10);
  const first = second * result;

  return {
    questionText: `${first} \u00F7 ${second}`,
    questionPostfix: ' =',
    result: result.toString(),
    answerList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const generateRandomMulQuestion = (): Question => {
  const first = getRandomInt(10);
  const second = getRandomInt(10);
  const result = first * second;

  // generate answerList
  let al: number[] = [];
  al.push(first * second);
  al.push(Math.abs(first * second - 1));
  al.push(Math.abs(first * second + 1));
  al.push(Math.abs((first - 1) * second));
  al.push(Math.abs((first + 1) * second));
  al.push(Math.abs(first * (second - 1)));
  al.push(Math.abs(first * (second + 1)));
  al.push(Math.abs((first - 1) * (second + 1)));
  al.push(Math.abs((first + 1) * (second - 1)));
  al.push(Math.abs((first + 1) * (second + 1)));
  al.push(Math.abs((first - 1) * (second - 1)));
  al.push(getRandomInt(100));
  al.push(getRandomInt(100));

  const answerList = toStringArray(sortArray(removeDuplicates(al)));

  return {
    questionText: `${first} \u00d7 ${second}`,
    questionPostfix: ' =',
    result: result.toString(),
    answerList,
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const generateRandomQuestion = (): Question => {
  // 1 of 4 is multiplication. 3 of 4 is division.
  if (getRandomInt(4) == 0) {
    return generateRandomMulQuestion();
  }

  return generateRandomDivisionQuestion();
};

const DivisionPage = () => (
  <QuizPage
    generateRandomQuestionFunc={generateRandomQuestion}
    metaTitle="Online division and multiplication quiz for kids"
    metaDesc="Online division and multiplication quiz for kids helps learn basic mathematical skills."
    heading="Division and multiplication quiz for kids"
  />
);

export default DivisionPage;
