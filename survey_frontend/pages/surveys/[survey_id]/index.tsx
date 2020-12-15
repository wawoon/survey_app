import React from "react";
import Axios from "axios";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import store from "../../../store";
import { Loading } from "../../../components/Loading";
import { ResponseForm } from "../../../components/ResponseForm";
import { useRespondentUuid } from "../../../lib/useRespondentUuid";

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

type DetailSurveyResponse = {
  survey: DetailSurvey;
  has_submitted: boolean;
};

type DetailSurvey = {
  id: number;
  user_id: number;
  title: string;
  content?: string;
  response_count: number;
  created_at: string;
  updated_at: string;
  questions: {
    id: number;
    survey_id: number;
    name: string;
    answer_count: number;
    created_at: string;
    updated_at: string;
    choices: {
      id: number;
      question_id: number;
      name: string;
      answer_count: number;
      created_at: string;
      updated_at: string;
    }[];
  }[];
};

const SurveyResultQustionCard: React.FC<{
  question: DetailSurvey["questions"][0];
}> = (props) => {
  const classes = useStyles();
  const question = props.question;
  return (
    <Card style={{ margin: "12px 0" }}>
      <CardContent>
        <Typography className={classes.header}>{question.name}</Typography>
        {question.choices.map((choice, i) => {
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  {i + 1}. {choice.name}
                </Typography>
                <Typography>
                  {choice.answer_count} votes{" "}
                  {question.answer_count != 0 &&
                    `(${(choice.answer_count / question.answer_count) * 100}%)`}
                </Typography>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const SurveyResult: React.FC<{ survey: DetailSurvey }> = (props) => {
  const survey = props.survey;
  return (
    <div>
      <Typography>{survey.response_count} people has submitted.</Typography>
      {survey.questions.map((q) => (
        <SurveyResultQustionCard key={q.id} question={q} />
      ))}
    </div>
  );
};

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
      <Typography className={classes.header}>{survey.title}</Typography>
      <Typography className={classes.content}>{survey.content}</Typography>

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
