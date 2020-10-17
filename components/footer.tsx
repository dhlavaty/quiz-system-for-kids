import React from 'react';
import Link from 'next/link';

const Index = () => (
  <footer>
    <p>
      Other quizes:{' '}
      <Link href="/twenty">
        <a>addition and subtraction quiz</a>
      </Link>{' '}
      &bull;{' '}
      <Link href="/">
        <a>division quiz</a>
      </Link>{' '}
      &bull;{' '}
      <Link href="/division-with-remainder">
        <a>division with remainder quiz</a>
      </Link>{' '}
      &bull;{' '}
      <Link href="/precedence">
        <a>operator precedence quiz</a>
      </Link>
    </p>
    <p>
      <small>
        <a href="https://github.com/dhlavaty/quiz-system-for-kids">github.com/dhlavaty/quiz-system-for-kids</a>
      </small>
    </p>
  </footer>
);

export default Index;
