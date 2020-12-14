import React from "react";
import store from "../store";

export const useHasLoggedIn = () => {
  const accessToken = store.getState().auth.accessToken;
  const [loggedIn, setLoggedIn] = React.useState<boolean>(!!accessToken);
  React.useEffect(() => {
    setLoggedIn(!!accessToken);
  }, [accessToken]);

  return loggedIn;
};
