import React from "react";
import Axios from "axios";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import store from "../../../store";
import { Loading } from "../../../components/Loading";
import { ResponseForm } from "../../../components/ResponseForm";
import { useRespondentUuid } from "../../../lib/useRespondentUuid";
import { SurveyResult } from "../../../components/SummaryResult";
import { DetailSurvey, DetailSurveyResponse } from "../../../typings";

const useStyles = makeStyles({
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    color: "#666",
  },
});

const SurveyShow = () => {
  const router = useRouter();
  const [survey, setSurvey] = useState<DetailSurvey | null>(null);
  const [hasSubmittedResponse, setHasSubmittedResponse] = useState<boolean>(
    false
  );
  const classes = useStyles();
  const [respondentUuid] = useRespondentUuid();

  const refetch = async () => {
    const res = await Axios.get<DetailSurveyResponse>(
      `http://localhost:3000/api/v1/surveys/${router.query.survey_id}`,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.accessToken}`,
          "X-RESPONDENT-UUID": respondentUuid, // To identify the user have send response before.
        },
      }
    );
    setSurvey(res.data.survey);
    setHasSubmittedResponse(res.data.has_submitted);
    console.log(res);
  };

  useEffect(() => {
    if (!router.query.survey_id) return;
    refetch();
  }, [router.query.survey_id]);
  const loading = !survey;

  if (loading) {
    return (
      <div>
        <Header />
        <Container maxWidth={"md"}>
          <Loading />
        </Container>
      </div>
    );
  }

  const componentAfterSubmition = (
    <Box>
      <Box
        style={{
          border: "1px solid black",
          borderRadius: 8,
          background: "#fff",
          padding: 8,
          marginTop: 16,
          fontSize: 20,
        }}
      >
        You has already done this survey.
        <br /> You can see the result!
      </Box>

      <SurveyResult survey={survey} />
    </Box>
  );

  const componentBeforeSubmition = (
    <Box>
      <Typography className={classes.header}>{survey.title}</Typography>
      <Typography className={classes.content}>{survey.content}</Typography>
      <ResponseForm
        survey={survey}
        onSuccess={() => {
          refetch();
        }}
        onError={(e) => {
          console.error(e);
        }}
      />
    </Box>
  );

  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        {hasSubmittedResponse
          ? componentAfterSubmition
          : componentBeforeSubmition}
      </Container>
    </div>
  );
};

export default SurveyShow;
