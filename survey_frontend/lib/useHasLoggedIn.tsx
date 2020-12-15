import React from "react";
import store from "../store";
import jwt_decode from "jwt-decode";

const identifyHasLoggedIn = (accessToken?: string | null) => {
  if (!accessToken) {
    return false;
  }

  const jwt = jwt_decode(accessToken);
  return jwt && jwt["exp"] >= new Date().getTime() / 1000;
};

export const useHasLoggedIn = () => {
  // TODO: handle expired accessToken.
  const accessToken = store.getState().auth.accessToken;
  const [loggedIn, setLoggedIn] = React.useState<boolean>(
    identifyHasLoggedIn(accessToken)
  );
  React.useEffect(() => {
    setLoggedIn(identifyHasLoggedIn(accessToken));
  }, [accessToken]);

  return loggedIn;
};
