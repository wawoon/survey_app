import { makeStyles, CircularProgress } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    left: "calc(50% - 25px)",
    top: "calc(50% - 25px)",
  },
});

export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  );
};
