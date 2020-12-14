import { Header } from "../../../../components/Header";
import { makeStyles, Typography } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import store from "../../../../store";

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
      console.log(res);
    };
    f();
  }, [router.query.survey_id]);

  return (
    <div>
      <Header />
      <Typography className={classes.header} component="h1">
        Your surveys
      </Typography>
      <div>{JSON.stringify(survey, null, 2)}</div>
    </div>
  );
};

export default ManageSurveyShow;
