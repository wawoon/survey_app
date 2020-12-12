import { makeStyles, Typography } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { SurveyCard } from "../../../../components/SurveyCard";
import store from "../../../../store";

const useStyles = makeStyles({
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ManageSurveyShow = () => {
  const [survey, setSurvey] = useState<any>(null);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await Axios.get(`http://localhost:3000/v1/surveys/1`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.accessToken}`,
        },
      });
      setSurvey(res.data.survey);
      console.log(res);
    };
    f();
  }, []);

  // const surveyCards = surveys.map((survey) => <SurveyCard survey={survey} />);

  return (
    <div>
      <Typography className={classes.header} component="h1">
        Your surveys
      </Typography>
      <div>{JSON.stringify(survey, null, 2)}</div>
    </div>
  );
};

export default ManageSurveyShow;
