import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';

import { getRandomInt, getRandomIntInclusive, removeDuplicates, toStringArray, sortArray } from '../components/helpers';

const generateRandomQuestion = (): Question => {
  let first = getRandomInt(10);
  let second = getRandomInt(10);
  let third = getRandomInt(10);
  const fourth = getRandomInt(10);
  let result = -1,
    questionText = '';

  switch (getRandomIntInclusive(0, 9)) {
    case 0:
      result = first * second + third;
      questionText = `${first} \u00d7 ${second} + ${third}`;
      break;

    case 1:
      result = first + second * third;
      questionText = `${first} + ${second} \u00d7 ${third}`;
      break;

    case 2:
      second = getRandomInt(5);
      third = getRandomInt(5);
      result = first * (second + third);
      questionText = `${first} \u00d7 (${second} + ${third})`;
      break;

    case 3:
      first = getRandomInt(5);
      second = getRandomInt(5);
      result = (first + second) * third;
      questionText = `(${first} + ${second}) \u00d7 ${third}`;
      break;

    case 4:
      result = first + second * third + fourth;
      questionText = `${first} + ${second} \u00d7 ${third} + ${fourth}`;
      break;

    case 5:
      result = first * second + third + fourth;
      questionText = `${first} \u00d7 ${second} + ${third} + ${fourth}`;
      break;

    case 6:
      result = first + second + third * fourth;
      questionText = `${first} + ${second} + ${third} \u00d7 ${fourth}`;
      break;

    case 7:
      third = getRandomInt(8) + 2; // vyhneme sa deleniu nulou a jednotkou (to je lahke)
      result = first + (second * third) / third + fourth;
      questionText = `${first} + ${second * third} \u00F7 ${third} + ${fourth}`;
      break;

    case 8:
      second = getRandomInt(8) + 2; // vyhneme sa deleniu nulou a jednotkou (to je lahke)
      result = ((first * second) / second) * third;
      questionText = `${first * second} \u00F7 ${second} \u00d7 ${third}`;
      break;

    case 9:
      // first * third nesmie byt viac ako 10 (aby sme boli v malej nasobilke)
      first = getRandomIntInclusive(2, 3);
      second = getRandomIntInclusive(4, 10);
      third = first <= 2 ? getRandomIntInclusive(2, 5) : getRandomIntInclusive(2, 3);
      result = first * second * third;
      questionText = `${first} \u00d7 ${second} \u00d7 ${third}`;
      break;
  }

  // generate answerList
  let al: number[] = [];
  al.push(result);
  al.push(Math.abs(result + 1));

  al.push(Math.abs(first * second + third));
  al.push(Math.abs(first * (second + third)));
  al.push(Math.abs((third + first) * second));
  al.push(Math.abs(first + second + third));
  al.push(Math.abs(first + second + third + fourth));
  al.push(Math.abs(first * second + third + fourth));
  al.push(Math.abs(first + second * third + fourth));
  al.push(Math.abs(first + second + third * fourth));

  al.push(Math.abs(first * second));
  al.push(Math.abs(second * third));
  al.push(Math.abs(first * third));
  al.push(Math.abs(third * fourth));
  al.push(Math.abs(second * fourth));

  al.push(Math.abs((first + 1) * second));
  al.push(Math.abs(first * (second + 1)));
  al.push(getRandomInt(100));
  al.push(getRandomInt(100));

  const answerList = toStringArray(sortArray(removeDuplicates(al)));

  return {
    questionText,
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
    metaTitle="Online operator precedence quiz for kids"
    metaDesc="Online mathematical operator precedence quiz for kids helps learn basic mathematical skills."
    heading="Operator precedence quiz for kids"
  />
);

export default MultiplicationPage;
