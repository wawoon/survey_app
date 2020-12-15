import React from "react";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import store from "../store";
import { SurveyCard } from "../components/SurveyCard";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { serverUrl } from "../lib/url";

const useStyles = makeStyles({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

const RootPage = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await Axios.get(`${serverUrl()}/api/v1/surveys`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.accessToken}`,
        },
      });
      setSurveys(res.data.surveys);
      console.log(res);
    };
    f();
  }, []);

  const surveyCards = surveys.map((survey) => (
    <SurveyCard href={`/surveys/${survey.id}`} survey={survey} />
  ));

  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        <Typography className={classes.title} component="h1">
          All surveys
        </Typography>
        {surveyCards}
      </Container>
    </div>
  );
};

export default RootPage;
