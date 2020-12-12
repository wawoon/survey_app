import { makeStyles, Typography } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { SurveyCard } from "../../components/SurveyCard";
import store from "../../store";

const useStyles = makeStyles({
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ManageIndex = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await Axios.get("http://localhost:3000/v1/surveys", {
        headers: {
          Authorization: `Bearer ${store.getState().auth.accessToken}`,
        },
      });
      setSurveys(res.data.surveys);
      console.log(res);
    };
    f();
  }, []);

  const surveyCards = surveys.map((survey) => <SurveyCard survey={survey} />);

  return (
    <div>
      <Typography className={classes.header} component="h1">
        Your surveys
      </Typography>
      <div>{surveyCards}</div>
    </div>
  );
};

export default ManageIndex;
