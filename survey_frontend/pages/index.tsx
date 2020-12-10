import React from "react";
import { TextField } from "@material-ui/core";

const RootPage: React.FC = () => {
  return (
    <div>
      <div>Login</div>
      <div>
        <div>email</div>
        <TextField type="email" />
        <div>password</div>
        <TextField type="password" />
      </div>
    </div>
  );
};

export default RootPage;
