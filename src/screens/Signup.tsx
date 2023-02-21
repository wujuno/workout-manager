import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";
import TopBox from "../components/auth/TopBox";
import FormBox from "../components/auth/Formbox";
import Input from "../components/auth/Input";
import SubmitBtn from "../components/auth/SubmitBtn";
import BottomBox from "../components/auth/BottomBox";
import { Helmet } from "react-helmet-async";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

interface ISignUpF {
  username: string;
  email: string;
  password: string;
  [id: string]: string;
}

interface IData {
  createAccount: {
    ok: boolean;
    error: string;
  };
}

const CREATEACCOUNT_MUTATION = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<ISignUpF>({ mode: "onChange" });
  const onCompleted = (data: IData) => {
    const {
      createAccount: { ok, error },
    } = data;
    const { username, password } = getValues();
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    navigate("/login", {
      state: {
        message: "Account created. Please log in.",
        username,
        password,
      },
    });
  };
  const [createAccount, { loading }] = useMutation(CREATEACCOUNT_MUTATION, {
    onCompleted,
  });
  const onvalid = (data: ISignUpF) => {
    if (loading) {
      return;
    }
    const { username, email, password } = getValues();
    createAccount({
      variables: {
        username,
        email,
        password,
      },
    });
  };
  const clearLoginError = () => clearErrors("result");
  return (
    <SLayout>
      <Helmet>
        <title>SignUp | WM</title>
      </Helmet>
      <TopBox>
        <Typography variant="h6" align="center">
          Workout Manager
        </Typography>
        <FormBox>
          <form onSubmit={handleSubmit(onvalid)}>
            <Input
              placeholder="Username"
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
            <Input
              placeholder="Email"
              type="text"
              onFocus={clearLoginError}
              {...register("email", {
                required: "Email을 입력해주세요.",
              })}
            />
            <FormError message={formState?.errors?.email?.message} />
            <Input
              placeholder="Password"
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
            <SubmitBtn
              type="submit"
              value="Sign Up"
              disabled={!formState.isValid || loading}
            />
            <FormError message={formState?.errors?.result?.message} />
          </form>
        </FormBox>

        <BottomBox cta="Have an account?" link="/login" linkText="Log in" />
      </TopBox>
    </SLayout>
  );
}

export default SignUp;
