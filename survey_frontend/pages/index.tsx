import React from "react";
import Link from "next/link";

const RootPage = () => {
  return (
    <div>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
    </div>
  );
};

export default RootPage;
