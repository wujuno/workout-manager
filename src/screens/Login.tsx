import styled from "styled-components";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import { useLocation, useNavigate } from "react-router-dom";
import SLayout from "../components/Layout";
import TopBox from "../components/auth/TopBox";
import FormBox from "../components/auth/Formbox";
import BottomBox from "../components/auth/BottomBox";
import FormError from "../components/auth/FormError";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { Button, Divider, TextField, Typography } from "@mui/material";

const GithubLogin = styled.div`
  display: flex;
  justify-content: center;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface ILoginF {
  username: string;
  password: string;
  [id: string]: string;
}
interface IData {
  login: {
    ok: boolean;
    error: string;
    token: string;
  };
}

const Notification = styled.div`
  color: #01a862;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<ILoginF>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data: IData) => {
    const {
      login: { error, ok, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
      navigate("/");
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onvalid = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
    setValue("username", "");
    setValue("password", "");
  };
  const clearLoginError = () => clearErrors("result");
  return (
    <SLayout>
      <Helmet>
        <title>Login | WM</title>
      </Helmet>
      <TopBox>
        <Typography variant="h5" align="center">
          Workout Manager
        </Typography>
        <FormBox>
          <form onSubmit={handleSubmit(onvalid)}>
            <TextField
              sx={{ mb: 2 }}
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              autoFocus
              type="text"
              onFocus={clearLoginError}
              {...register("username", {
                required: "유저이름을 입력해주세요.",
                minLength: {
                  value: 2,
                  message: "유저이름은 2자 보다 길어야 합니다.",
                },
                maxLength: {
                  value: 15,
                  message: "유저이름은 15자 보다 짧아야 합니다.",
                },
              })}
            />
            <FormError message={formState?.errors?.username?.message} />
            <TextField
              id="password"
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              onFocus={clearLoginError}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 보다 길어야 합니다.",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호는 20자 보다 짧아야 합니다.",
                },
              })}
            />
            <FormError message={formState?.errors?.password?.message} />
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              fullWidth
              type="submit"
              value={loading ? "Loading..." : "Log in"}
              disabled={!formState.isValid || loading}
            >
              Log in
            </Button>
            <FormError message={formState?.errors?.result?.message} />
            <Notification>{location?.state?.message}</Notification>
          </form>
        </FormBox>
        <Divider />
        <BottomBox
          cta="Don't have an account?"
          link="/signup"
          linkText="Sign Up"
        />
      </TopBox>
    </SLayout>
  );
}

export default LogIn;
