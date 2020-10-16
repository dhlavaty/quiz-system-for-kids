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
      <Link href="/precedence">
        <a>operator precedence quiz</a>
      </Link>
    </p>
  </footer>
);

export default Index;
