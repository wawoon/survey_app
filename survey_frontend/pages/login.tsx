import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { setAuth } from "../lib/slices/auth_slice";
import { ReduxStore } from "../store";
import { useRouter } from "next/router";
import Link from "next/link";

type LoginFormValue = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: ReduxStore) => state.auth.accessToken
  );
  const onSubmit = async (data: LoginFormValue) => {
    try {
      const ret = await axios.post(
        "http://localhost:3000/manage/v1/authenticate",
        {
          email: data.email,
          password: data.password,
        }
      );

      dispatch(setAuth({ accessToken: ret.data.auth_token }));
      router.push("/manage");
      console.log(ret.data.auth_token);
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
            {/* <div>{accessToken}</div> */}

            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </form>
        );
      }}
    ></Form>
  );
};

export default LoginPage;
