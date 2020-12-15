import Axios from "axios";
import { makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import store from "../../../store";

const useStyles = makeStyles({
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

type DetailSurvey = {
  id: number;
  user_id: number;
  title: string;
  content?: string;
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
      created_at: string;
      updated_at: string;
    };
  }[];
};

const SurveyShow = () => {
  const router = useRouter();
  const [survey, setSurvey] = useState<DetailSurvey | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!router.query.survey_id) return;

    const f = async () => {
      const res = await Axios.get<{ survey: DetailSurvey }>(
        `http://localhost:3000/api/v1/surveys/${router.query.survey_id}`,
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.accessToken}`,
          },
        }
      );
      setSurvey(res.data.survey);
      console.log(res);
    };
    f();
  }, [router.query.survey_id]);

  return (
    <div>
      <Header />
      <Typography>SurveyShow</Typography>
      <div>{JSON.stringify(survey, null, 2)}</div>
    </div>
  );
};

export default SurveyShow;
