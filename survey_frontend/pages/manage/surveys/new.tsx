import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  InputLabel,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { ReduxStore } from "../../../store";
import { useRouter } from "next/router";
import { Header } from "../../../components/Header";
// import Link from "next/link";

type Choice = {
  name: string;
};

type Question = {
  name: string;
  choices: Choice[];
};

type ManageSurveyNewFormValue = {
  title: string;
  content: string;
  questions: Question[];
};

const ManageSurveyNewForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: ReduxStore) => state.auth.accessToken
  );
  const onSubmit = async (data: ManageSurveyNewFormValue) => {
    try {
      const dataToSend = {
        title: data.title,
        content: data.content,
        questions_attributes: data.questions.map((q) => {
          return {
            name: q.name,
            choices_attributes: q.choices.map((c) => {
              return {
                name: c.name,
              };
            }),
          };
        }),
      };

      const ret = await axios.post(
        "http://localhost:3000/manage/v1/surveys",
        {
          survey: dataToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(ret);

      // dispatch(setAuth({ accessToken: ret.data.auth_token }));
      router.push("/manage");
      // console.log(ret.data.auth_token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form<ManageSurveyNewFormValue>
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
              <div>Create new servay</div>
              <div>
                <InputLabel style={{ padding: "8px 0" }}>title</InputLabel>
                <Field name="title">
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
                <InputLabel style={{ padding: "8px 0" }}>content</InputLabel>
                <Field name="content">
                  {(props) => (
                    <TextField
                      type="textarea"
                      style={{ width: "100%" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
              </div>

              <div>
                <div>questions</div>
                <button
                  type="button"
                  onClick={() => {
                    push("questions", { choices: [undefined] });
                  }}
                >
                  Add question to this form
                </button>

                <FieldArray name="questions">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <Card key={name} style={{ margin: 8 }}>
                        <CardContent>
                          <div>
                            <InputLabel style={{ display: "flex" }}>
                              Question. #{index + 1}
                            </InputLabel>
                            <Field name={`${name}.name`}>
                              {(props) => (
                                <TextField
                                  // type="password"
                                  style={{ width: "100%" }}
                                  name={props.input.name}
                                  value={props.input.value}
                                  onChange={props.input.onChange}
                                  placeholder={`Q${index + 1}. Title`}
                                />
                              )}
                            </Field>
                            {/* <Field
                          name={`${name}.lastName`}
                          component="input"
                          placeholder="Last Name"
                        /> */}
                            <InputLabel style={{ padding: "8px 0" }}>
                              choices
                            </InputLabel>
                            <FieldArray name={`${name}.choices`}>
                              {({ fields }) =>
                                fields.map((choiceName, index) => (
                                  <div
                                    key={choiceName}
                                    style={{
                                      padding: "4px 0",
                                      display: "flex",
                                      alignContent: "center",
                                    }}
                                  >
                                    <Field
                                      name={`${choiceName}.name`}
                                      component="input"
                                      placeholder="name"
                                    >
                                      {(props) => (
                                        <TextField
                                          name={props.input.name}
                                          value={props.input.value}
                                          onChange={props.input.onChange}
                                          placeholder={`Choice ${
                                            index + 1
                                          }. Name`}
                                          style={{ flex: 1 }}
                                        />
                                      )}
                                    </Field>
                                    {/* <Field
                          name={`${name}.lastName`}
                          component="input"
                          placeholder="Last Name"
                        /> */}
                                    <div
                                      onClick={() => fields.remove(index)}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        margin: "0 8px",
                                      }}
                                    >
                                      ❌
                                    </div>
                                  </div>
                                ))
                              }
                            </FieldArray>
                          </div>
                        </CardContent>
                        <CardActions>
                          <Button
                            onClick={() => fields.remove(index)}
                            style={{ cursor: "pointer" }}
                          >
                            Remove Question
                          </Button>

                          <Button
                            onClick={() => push(`${name}.choices`, undefined)}
                            style={{ cursor: "pointer" }}
                          >
                            Add Choice
                          </Button>
                        </CardActions>
                      </Card>
                    ))
                  }
                </FieldArray>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        );
      }}
    ></Form>
  );
};

const ManageSurveyNew = () => {
  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        <div>New Survey</div>
        <ManageSurveyNewForm />
      </Container>
    </div>
  );
};

export default ManageSurveyNew;
