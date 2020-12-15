import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { Button, Container, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import { setAuth } from "../lib/slices/auth_slice";
import { ReduxStore } from "../store";
import { useRouter } from "next/router";
import Link from "next/link";
import { Header } from "../components/Header";
import { FormTitle } from "../components/FormTitle";
import { serverUrl } from "../lib/url";

type LoginFormValue = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: ReduxStore) => state.auth.accessToken
  );
  const onSubmit = async (data: LoginFormValue) => {
    try {
      const ret = await axios.post(`${serverUrl()}/manage/v1/authenticate`, {
        email: data.email,
        password: data.password,
      });

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
              <div>
                <FormTitle>Login</FormTitle>
                <InputLabel style={{ padding: "8px 0" }}>email</InputLabel>
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
                <InputLabel style={{ padding: "8px 0" }}>password</InputLabel>
                <Field name="password">
                  {(props) => (
                    <TextField
                      type="password"
                      style={{ width: "100%" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div style={{ padding: "8px 0" }}>
              <Button type="submit" color="secondary" onSubmit={handleSubmit}>
                Login
              </Button>
            </div>

            <div>
              <Link href="/signup">
                <a>If you haven't create an account, click here to sign up.</a>
              </Link>
            </div>
          </form>
        );
      }}
    ></Form>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
