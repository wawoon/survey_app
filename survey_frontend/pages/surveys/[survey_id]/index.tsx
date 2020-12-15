import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import Axios from "axios";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import store, { ReduxStore } from "../../../store";
import { Loading } from "../../../components/Loading";
import { setUuid } from "../../../lib/slices/auth_slice";

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
    }[];
  }[];
};

type ResponseFormValue = {
  name: string;
  email: string;
  choice_ids: string[];
};

const useRespondentUuid = () => {
  const dispatch = useDispatch();
  const uuid = useSelector((state: ReduxStore) => state.auth.respondentUuid);
  const setRespondentUuid = (uuid: string) => {
    dispatch(setUuid({ respondentUuid: uuid }));
  };

  return [uuid, setRespondentUuid];
};

const ResponseForm: React.FC<{ survey: DetailSurvey }> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: ReduxStore) => state.auth.accessToken
  );
  const [respondentUuid, setRespondentUuid] = useRespondentUuid();

  const onSubmit = async (data: ResponseFormValue) => {
    try {
      const dataToSend = {
        survey_id: props.survey.id,
        respondent_uuid: respondentUuid,
        user_name: data.name,
        user_email: data.email,
        choice_ids: data.choice_ids.map((id) => parseInt(id)),
      };

      const ret = await Axios.post(
        `http://localhost:3000/api/v1/surveys/${props.survey.id}/responses`,
        {
          response: dataToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(ret);
      if (ret.data.respondent_uuid) {
        setRespondentUuid(ret.data.respondent_uuid);
      }

      // dispatch(setAuth({ accessToken: ret.data.auth_token }));
      // router.push("/manage");
      // console.log(ret.data.auth_token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form<ResponseFormValue>
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        }, // injected from final-form-arrays above
        pristine,
        form,
        submitting,
        values,
      }) => {
        console.log(values);
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>Respond to survey</div>
              <div>
                <div>name</div>
                <Field name="name">
                  {(props) => (
                    <TextField
                      type="text"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
                <div>email</div>
                <Field name="email">
                  {(props) => (
                    <TextField
                      type="email"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
              </div>

              <div>
                <div>Please answer questions</div>
                {(() => {
                  const cards = props.survey.questions.map((q, i) => {
                    return (
                      <Field type="radio" name={`choice_ids[${i}]`}>
                        {(props) => (
                          <div>
                            <FormLabel component="legend">
                              {i + 1}. {q.name}
                            </FormLabel>
                            <RadioGroup
                              name={props.input.name}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            >
                              {q.choices.map((choice) => {
                                return (
                                  <FormControlLabel
                                    value={choice.id.toString()}
                                    control={<Radio />}
                                    label={choice.name}
                                  />
                                );
                              })}
                            </RadioGroup>
                          </div>
                        )}
                      </Field>
                    );
                  });

                  return cards;
                })()}
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        );
      }}
    ></Form>
  );
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
  const loading = !survey;

  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        <Typography className={classes.header}>SurveyShow</Typography>
        {loading ? (
          <Loading />
        ) : (
          <Box>
            <ResponseForm survey={survey} />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default SurveyShow;
