import React from "react";
import Link from "next/link";

const Index = () => (
  <footer>
    <p>
      Other quizes:{" "}
      <Link href="/multiplication">
        <a>multiplication quiz</a>
      </Link>{" "}
      &bull;{" "}
      <Link href="/">
        <a>division quiz</a>
      </Link>
    </p>
  </footer>
);

export default Index;