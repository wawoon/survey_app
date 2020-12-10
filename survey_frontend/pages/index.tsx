import React from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "@material-ui/core";

const RootPage: React.FC = () => {
  return (
    <Form
      onSubmit={(data) => {
        console.log(data);
      }}
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
