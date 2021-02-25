import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';
import {
  getRandomInt,
  getRandomIntInclusive,
  toStringArrayWithPostfix,
  sortArray,
  removeDuplicates,
  getRandomBool,
} from '../components/helpers';

const generateRandomQuestion = (): Question => {
  // first / second = third rm. reminder
  const second = getRandomIntInclusive(3, 9); // to avoid division-by-zero
  const third = getRandomIntInclusive(1000, 9999);
  const remainder = second > 5 ? getRandomIntInclusive(4, second - 1) : getRandomInt(second);
  const first = second * third + remainder;

  // change thousand and hundred number place
  const shuf = Math.abs(Math.floor((third % 1000) / 100) * 1000 + Math.floor(third / 1000) * 100 + (third % 100));

  // generate answerList
  let al: number[] = [];
  al.push(third);
  al.push(shuf);

  let rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 1 : third - 1));
  al.push(Math.abs(rndBool ? shuf + 1 : shuf - 1));
  al.push(Math.abs(rndBool ? third + 100 : third - 100));
  al.push(Math.abs(rndBool ? shuf + 100 : shuf - 100));
  al.push(Math.abs(rndBool ? third + 111 : third - 111));
  al.push(Math.abs(rndBool ? shuf + 111 : shuf - 111));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 10 : third - 10));
  al.push(Math.abs(rndBool ? shuf + 10 : shuf - 10));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 1000 : third - 1000));
  al.push(Math.abs(rndBool ? shuf + 1000 : shuf - 1000));
  al.push(Math.abs(rndBool ? third + 1010 : third - 1010));
  al.push(Math.abs(rndBool ? shuf + 1010 : shuf - 1010));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 201 : third - 201));
  al.push(Math.abs(rndBool ? shuf + 2001 : shuf - 2001));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 3 : third - 3));
  al.push(Math.abs(rndBool ? shuf + 3 : shuf - 3));

  const answerList = toStringArrayWithPostfix(sortArray(removeDuplicates(al)), ' rm. ?');

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
    answerList,
    answered: '', // just to avoid null
    generatedAt: Date.now(),
    answeredAt: -1, // -1 just to avoid null
  };
};

const DivisionPage = () => (
  <QuizPage
    generateRandomQuestionFunc={generateRandomQuestion}
    metaTitle="Online big numbers division with remainder quiz for kids"
    metaDesc="Online big numbers division with remainder quiz for kids helps learn basic mathematical skills."
    heading="Big numbers division with remainder quiz for kids"
  />
);

export default DivisionPage;
