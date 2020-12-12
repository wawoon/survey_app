import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { ReduxStore } from "../../../store";
import { useRouter } from "next/router";
// import Link from "next/link";

type ManageSurveyNewFormValue = {
  title: string;
  content: string;
};

const ManageSurveyNew: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: ReduxStore) => state.auth.accessToken
  );
  const onSubmit = async (data: ManageSurveyNewFormValue) => {
    try {
      const ret = await axios.post(
        "http://localhost:3000/v1/surveys",
        {
          survey: {
            title: data.title,
            content: data.content,
          },
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
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>Create new servay</div>
              <div>
                <div>title</div>
                <Field name="title">
                  {(props) => (
                    <TextField
                      type="text"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
                <div>content</div>
                <Field name="content">
                  {(props) => (
                    <TextField
                      type="textarea"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        );
      }}
    ></Form>
  );
};

export default ManageSurveyNew;
