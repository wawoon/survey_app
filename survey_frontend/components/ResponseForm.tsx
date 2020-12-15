import React from "react";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import Axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
} from "@material-ui/core";
import { ReduxStore } from "../store";
import { useRespondentUuid } from "../lib/useRespondentUuid";
import { FormTitle } from "./FormTitle";

type ResponseType = {
  id: number;
  user_email: string;
  user_name: string;
  created_at: string;
  updated_at: string;
};

type ResponseCreateAPIResponse = {
  response: ResponseType;
  respondent_uuid: string;
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

type ResponseFormValue = {
  name: string;
  email: string;
  choice_ids: string[];
};

export const ResponseForm: React.FC<{
  survey: DetailSurvey;
  onSuccess: () => void;
  onError: (err: Error) => void;
}> = (props) => {
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

      const ret = await Axios.post<ResponseCreateAPIResponse>(
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

      props.onSuccess();

      // dispatch(setAuth({ accessToken: ret.data.auth_token }));
      // router.push("/manage");
      // console.log(ret.data.auth_token);
    } catch (e) {
      console.error(e);
      props.onError(e);
    }
  };

  return (
    <Form<ResponseFormValue>
      mutators={{
        ...arrayMutators,
      }}
      initialValues={{
        name: "",
        email: "",
        choice_ids: [],
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
        return (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <div style={{ padding: "8px 0" }}>
                  <FormTitle>About you</FormTitle>
                  <div>
                    <InputLabel>name</InputLabel>
                    <Field name="name">
                      {(props) => (
                        <TextField
                          type="text"
                          style={{ width: "100%" }}
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                        />
                      )}
                    </Field>
                    <InputLabel>email</InputLabel>
                    <Field name="email">
                      {(props) => (
                        <TextField
                          type="email"
                          style={{ width: "100%" }}
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                        />
                      )}
                    </Field>
                  </div>

                  <div>
                    <FormTitle>Please answer questions</FormTitle>
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
              </CardContent>
              <CardActions>
                <Button onClick={handleSubmit}>Send response</Button>
              </CardActions>
            </Card>
          </form>
        );
      }}
    ></Form>
  );
};
