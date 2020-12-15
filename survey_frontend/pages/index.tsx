import React from "react";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import store from "../store";
import { SurveyCard } from "../components/SurveyCard";
import { Container } from "@material-ui/core";

const RootPage = () => {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    const f = async () => {
      const res = await Axios.get("http://localhost:3000/api/v1/surveys", {
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
      <Container maxWidth={"md"}>{surveyCards}</Container>
    </div>
  );
};

export default RootPage;
