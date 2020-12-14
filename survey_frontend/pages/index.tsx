import React from "react";
import Link from "next/link";
import { Header } from "../components/Header";

const RootPage = () => {
  return (
    <div>
      <Header />
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
