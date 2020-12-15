import { Header } from "../../../../components/Header";
import { makeStyles, Typography, Container } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import store from "../../../../store";
import { SurveyResult } from "../../../../components/SummaryResult";
import { Loading } from "../../../../components/Loading";

const useStyles = makeStyles({
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ManageSurveyShow = () => {
  const router = useRouter();
  const [survey, setSurvey] = useState<any>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!router.query.survey_id) return;

    const f = async () => {
      const res = await Axios.get(
        `http://localhost:3000/manage/v1/surveys/${router.query.survey_id}`,
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.accessToken}`,
          },
        }
      );
      setSurvey(res.data.survey);
    };
    f();
  }, [router.query.survey_id]);

  const loading = !survey;
  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        <Typography className={classes.header} component="h1">
          Your surveys
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <SurveyResult survey={survey} />
          </div>
        )}

        <a href={`http://localhost:5000/surveys/${router.query.survey_id}`}>
          Public URL to share
        </a>
      </Container>
    </div>
  );
};

export default ManageSurveyShow;
