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

type SignUpFormValue = {
  email: string;
  name: string;
  password: string;
};

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: ReduxStore) => state.auth.accessToken
  );
  const onSubmit = async (data: SignUpFormValue) => {
    try {
      const ret = await axios.post(
        `${serverUrl()}/manage/v1/signup`,
        {
          email: data.email,
          name: data.name,
          password: data.password,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${ret.data.access_token}`,
        //   },
        // }
      );

      dispatch(setAuth({ accessToken: ret.data.auth_token }));
      router.push("/manage");
      console.log(ret.data.auth_token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form<SignUpFormValue>
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <FormTitle>Sign up</FormTitle>
                <InputLabel style={{ padding: "8px 0" }}>name</InputLabel>
                <Field name="name">
                  {(props) => (
                    <TextField
                      type="name"
                      style={{ width: "100%" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
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
                Create Account
              </Button>
            </div>

            <div>
              <Link href="/login">
                <a>
                  If you already have an account, Please click here to login.
                </a>
              </Link>
            </div>
          </form>
        );
      }}
    ></Form>
  );
};

const SignupPage = () => {
  return (
    <div>
      <Header />
      <Container maxWidth={"md"}>
        <div>Sign Up</div>
        <SignUpForm />
      </Container>
    </div>
  );
};

export default SignupPage;
