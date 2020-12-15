import Axios from "axios";
import { makeStyles } from "@material-ui/core";
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

const SurveyShow = () => {
  const router = useRouter();
  const [survey, setSurvey] = useState<any>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!router.query.survey_id) return;

    const f = async () => {
      const res = await Axios.get(
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
      SurveyShow
      <div>{JSON.stringify(survey, null, 2)}</div>
    </div>
  );
};

export default SurveyShow;
