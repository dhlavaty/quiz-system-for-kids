import React from 'react';
import { QuizPage } from '../components/quiz-page';
import { Question } from '../components/question';
import {
  getRandomInt,
  getRandomIntInclusive,
  toStringArrayWithPostfix,
  toStringArrayWithPrefix,
  sortArray,
  removeDuplicates,
  getRandomBool,
} from '../components/helpers';

const generateRandomQuestion = (): Question => {
  // first / second = third rm. reminder
  const second = getRandomIntInclusive(3, 99); // to avoid division-by-zero
  const third = getRandomIntInclusive(100, 999);
  const remainder = getRandomIntInclusive(0, second - 1);
  const first = second * third + remainder;

  let al: number[] = [];

  if (getRandomInt(2) == 0) {
    al.push(remainder);
    al.push(Math.abs(getRandomBool() ? remainder + 1 : remainder - 1));
    al.push(Math.abs(getRandomBool() ? remainder + 2 : remainder - 2));
    al.push(Math.abs(getRandomBool() ? remainder + 3 : remainder - 3));
    al.push(Math.abs(getRandomBool() ? remainder + 10 : remainder - 10));
    al.push(Math.abs(getRandomBool() ? remainder + 11 : remainder - 11));
    al.push(Math.abs(getRandomBool() ? remainder + 20 : remainder - 20));
    al.push(Math.abs(getRandomBool() ? remainder + 21 : remainder - 21));
    const answerList2 = toStringArrayWithPrefix(sortArray(removeDuplicates(al)), 'rm. ');

    return {
      questionText: `${first} \u00F7 ${second}`,
      questionPostfix: ' =',
      result: `rm. ${remainder}`,
      answerList: answerList2,
      answered: '', // just to avoid null
      generatedAt: Date.now(),
      answeredAt: -1, // -1 just to avoid null
    };
  }

  // change thousand and hundred number place
  // const thousands = Math.floor((third % 10000) / 1000);
  const hundred = Math.floor((third % 1000) / 100);
  const tens = Math.floor((third % 100) / 10);
  const ones = third % 10;
  const shuf = Math.abs(tens * 100 + hundred * 10 + ones);

  // generate answerList
  al.push(third);
  al.push(shuf);

  let rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 1 : third - 1));
  al.push(Math.abs(rndBool ? shuf + 1 : shuf - 1));
  al.push(Math.abs(rndBool ? third + 10 : third - 10));
  al.push(Math.abs(rndBool ? third + 11 : third - 11));
  al.push(Math.abs(rndBool ? shuf + 11 : shuf - 11));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? shuf + 10 : shuf - 10));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 100 : third - 100));
  al.push(Math.abs(rndBool ? shuf + 100 : shuf - 100));
  al.push(Math.abs(rndBool ? third + 110 : third - 110));
  al.push(Math.abs(rndBool ? shuf + 110 : shuf - 110));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 21 : third - 21));
  al.push(Math.abs(rndBool ? shuf + 21 : shuf - 21));

  rndBool = getRandomBool();
  al.push(Math.abs(rndBool ? third + 3 : third - 3));
  al.push(Math.abs(rndBool ? shuf + 3 : shuf - 3));

  const answerList = toStringArrayWithPostfix(sortArray(removeDuplicates(al)), ' rm. ?');

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
