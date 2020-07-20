import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';

import { getRandomInt, removeDuplicates, toStringArray, sortArray } from '../components/helpers';

const generateRandomQuestion = (): Question => {
  const first = getRandomInt(10); // to avoid division-by-zero
  const second = getRandomInt(10); // to avoid division-by-zero
  const result = first + second;

  // generate answerList
  let al: number[] = [];
  al.push(result);
  al.push(Math.abs(first - 1));
  al.push(Math.abs(first + 1));
  al.push(Math.abs(first));
  al.push(Math.abs(second));
  al.push(Math.abs(result + 1));
  al.push(Math.abs(result - 1));
  al.push(Math.abs(result + 4));
  al.push(Math.abs(result - 5));
  al.push(getRandomInt(20));
  al.push(getRandomInt(20));
  al.push(getRandomInt(20));

  const answerList = toStringArray(sortArray(removeDuplicates(al)));

  if (getRandomInt(8) > 3) {
    return {
      questionText: `${first} + ${second}`,
      result: result.toString(),
      answerList,
      answered: '', // just to avoid null
      generatedAt: Date.now(),
      answeredAt: -1, // -1 just to avoid null
    };
  }

  return {
    questionText: `${result} - ${second}`,
    result: first.toString(),
    answerList,
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const DivisionPage = () => (
  <QuizPage
    generateRandomQuestionFunc={generateRandomQuestion}
    metaTitle="Online addition and subtraction to twenty - quiz for kids"
    metaDesc="Online addition and subtraction quiz for kids helps learn basic mathematical skills."
    heading="Addition and subtraction to twenty quiz for kids"
  />
);

export default DivisionPage;
