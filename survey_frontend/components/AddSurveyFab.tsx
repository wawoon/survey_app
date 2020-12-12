import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: 12,
      right: 12,
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export const AddSurveyFab: React.FC<{
  onClick?: (event: any) => void;
}> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab variant="extended" onClick={props.onClick}>
        <AddIcon className={classes.extendedIcon} />
        New Survey
      </Fab>
    </div>
  );
};
