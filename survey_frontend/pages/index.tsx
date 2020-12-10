import React from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "@material-ui/core";
import axios from "axios";

type LoginFormValue = {
  email: string;
  password: string;
};

const RootPage: React.FC = () => {
  const onSubmit = async (data: LoginFormValue) => {
    try {
      const ret = await axios.post("http://localhost:3000/authenticate", {
        email: data.email,
        password: data.password,
      });
      console.log(ret);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form<LoginFormValue>
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>Login</div>
              <div>
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
                <div>password</div>
                <Field name="password">
                  {(props) => (
                    <TextField
                      type="password"
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

export default RootPage;
