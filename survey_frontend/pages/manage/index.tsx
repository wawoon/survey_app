import { makeStyles, Typography } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SurveyCard } from "../../components/SurveyCard";
import { AddSurveyFab } from "../../components/AddSurveyFab";
import store from "../../store";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ManageIndex = () => {
  const router = useRouter();
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
  const navigateToNewSurvey = () => {
    router.push("/manage/surveys/new");
  };

  return (
    <div>
      <Header />
      <Typography className={classes.header} component="h1">
        Your surveys
      </Typography>
      <div>{surveyCards}</div>
      <AddSurveyFab onClick={navigateToNewSurvey} />
    </div>
  );
};

export default ManageIndex;
