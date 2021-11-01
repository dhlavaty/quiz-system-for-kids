import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';

import {
  getRandomDecimal,
  getRandomIntInclusive,
  getRandomBool,
  roundDecimal,
  removeDuplicates,
  toStringArray,
  sortArray,
} from '../components/helpers';

const generateRandomQuestion = (): Question => {
  let first = getRandomDecimal(0, 10, 2);
  let second = getRandomDecimal(0, 10, 2);
  let third = getRandomDecimal(0, 10, 2);
  const fourth = getRandomDecimal(0, 10, 2);
  let result = -1.0,
    questionText = '';

  switch (getRandomIntInclusive(0, 6)) {
    case 0:
      result = roundDecimal(first * second + third, 4);
      questionText = `${first} \u00d7 ${second} + ${third}`;
      break;

    case 1:
      result = roundDecimal(first + second * third, 4);
      questionText = `${first} + ${second} \u00d7 ${third}`;
      break;

    case 2:
      second = getRandomDecimal(1, 5, 2);
      third = getRandomDecimal(1, 5, 2);
      result = roundDecimal(first * (second + third), 4);
      questionText = `${first} \u00d7 (${second} + ${third})`;
      break;

    case 3:
      first = getRandomDecimal(1, 5, 2);
      second = getRandomDecimal(1, 5, 2);
      result = roundDecimal((first + second) * third, 4);
      questionText = `(${first} + ${second}) \u00d7 ${third}`;
      break;

    case 4:
      result = roundDecimal(first + second * third + fourth, 4);
      questionText = `${first} + ${second} \u00d7 ${third} + ${fourth}`;
      break;

    case 5:
      result = roundDecimal(first * second + third + fourth, 4);
      questionText = `${first} \u00d7 ${second} + ${third} + ${fourth}`;
      break;

    case 6:
      result = roundDecimal(first + second + third * fourth, 4);
      questionText = `${first} + ${second} + ${third} \u00d7 ${fourth}`;
      break;
  }

  // generate answerList
  let al: number[] = [];
  al.push(result);

  if (getRandomBool() == true) {
    al.push(roundDecimal(Math.abs(result + 1), 4));
    al.push(roundDecimal(Math.abs(result - 1.1), 4));
    al.push(roundDecimal(Math.abs(result + 0.1), 4));
    al.push(roundDecimal(Math.abs(result - 0.11), 4));
  } else {
    al.push(roundDecimal(Math.abs(result - 1), 4));
    al.push(roundDecimal(Math.abs(result + 1.1), 4));
    al.push(roundDecimal(Math.abs(result - 0.1), 4));
    al.push(roundDecimal(Math.abs(result + 0.11), 4));
  }

  if (getRandomBool() == true) {
    al.push(roundDecimal(Math.abs((first - 1) * second + third), 4));
  } else {
    al.push(roundDecimal(Math.abs(first * (second - 2.1) + third), 4));
  }

  if (getRandomBool() == true) {
    al.push(roundDecimal(Math.abs(first * (second + third)), 4));
  } else {
    al.push(roundDecimal(Math.abs(first * (second + third + 1)), 4));
  }

  if (getRandomBool() == true) {
    al.push(roundDecimal(Math.abs((third + first) * second), 4));
  } else {
    al.push(roundDecimal(Math.abs((third + first) * second + 1.1), 4));
  }

  al.push(roundDecimal(Math.abs(first + second + third), 4));
  al.push(roundDecimal(Math.abs(first + second + third + fourth), 4));
  al.push(roundDecimal(Math.abs(first * second + third + fourth), 4));
  al.push(roundDecimal(Math.abs(first + second * third + fourth), 4));
  al.push(roundDecimal(Math.abs(first + second + third * fourth), 4));

  al.push(roundDecimal(Math.abs(first * second), 4));
  al.push(roundDecimal(Math.abs(second * third), 4));
  al.push(roundDecimal(Math.abs(first * third), 4));
  al.push(roundDecimal(Math.abs(third * fourth), 4));
  al.push(roundDecimal(Math.abs(second * fourth), 4));

  al.push(roundDecimal(Math.abs((first + 1) * second), 4));
  al.push(roundDecimal(Math.abs(first * (second + 1)), 4));
  al.push(roundDecimal(getRandomDecimal(0, 10, 2), 4));
  al.push(roundDecimal(getRandomDecimal(0, 100, 2), 4));

  const answerList = toStringArray(sortArray(removeDuplicates(al)));

  return {
    questionText,
    questionPostfix: ' =',
    result: result.toString(),
    answerList,
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const MultiplicationPage = () => (
  <QuizPage
    generateRandomQuestionFunc={generateRandomQuestion}
    metaTitle="Online decimal numbers quiz for kids"
    metaDesc="Online mathematical decimal numbers quiz for kids helps learn basic mathematical skills."
    heading="Decimal numbers quiz for kids"
  />
);

export default MultiplicationPage;
