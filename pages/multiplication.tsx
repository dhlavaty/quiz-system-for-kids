import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';
import { removeDuplicates, toStringArray, sortArray } from '../components/helpers';

const generateRandomQuestion = (): Question => {
  const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

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
    metaTitle="Online multiplication quiz for kids"
    metaDesc="Online multiplication quiz for kids helps learn basic mathematical skills."
    heading="Multiplication quiz for kids"
  />
);

export default MultiplicationPage;
