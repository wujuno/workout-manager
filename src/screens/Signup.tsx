import styled from "styled-components";
import { useForm } from "react-hook-form"
import SLayout from "../components/Layout";
import TopBox from "../components/auth/TopBox";
import STitle from "../components/auth/Title";
import FormBox from "../components/auth/Formbox";
import Input from "../components/auth/Input";
import SubmitBtn from "../components/auth/SubmitBtn";
import Separator from "../components/auth/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import BottomBox from "../components/auth/BottomBox";
import { Helmet } from "react-helmet-async";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GithubLogin = styled.div`
  display: flex;
  justify-content:center;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;


interface ISignUpF {
    username: string
    email: string
    password: string
    [id:string]: string
}

interface IData {
    createAccount:{
        ok:boolean
        error:string
    }
}

const CREATEACCOUNT_MUTATION = gql`
    mutation($username:String!, $email:String!, $password:String!){
        createAccount(username:$username,email:$email, password:$password){
            ok
            error
        }
    }
`;


function SignUp (){
    const navigate = useNavigate();
    const { register,
            handleSubmit,
            formState,
            getValues,
            setError,
            clearErrors } = useForm<ISignUpF>({mode:"onChange"});
    const onCompleted = (data:IData) =>{
        const {createAccount:{ok,error}} = data;
        const {username,password} =getValues();
        if(!ok){
            return setError("result",{
                message: error,
            })
        }
        navigate("/login",{
            state:{
                message:"Account created. Please log in.",
                username,
                password,
                
            }
        });
    }
    const [createAccount,{loading}] = useMutation(CREATEACCOUNT_MUTATION,{onCompleted})
    const onvalid = (data:ISignUpF) => {
        if(loading){
            return;
        }
        const {username,email,password} =getValues();
        createAccount({
            variables:{
                username,
                email,
                password
            }
        })
    }
    const clearLoginError = () => clearErrors("result");
    return (
        <SLayout>
            <Helmet>
                <title>SignUp | WM</title>
            </Helmet>
            <TopBox>
            <STitle title="Workout Manager" />
                <FormBox>
                <form onSubmit={handleSubmit(onvalid)}>
                    <Input
                        placeholder="Username"
                        type="text" 
                        onFocus={clearLoginError}
                        {...register("username", {
                            required:"??????????????? ??????????????????.", 
                            minLength:{
                                value:2,
                                message: "??????????????? 2??? ?????? ????????? ?????????.",
                            }, 
                            maxLength:{
                                value:15,
                                message: "??????????????? 15??? ?????? ????????? ?????????.",
                            },
                        })}
                    />
                    <FormError message={formState?.errors?.username?.message} />
                    <Input
                        placeholder="Email"
                        type="text"
                        onFocus={clearLoginError}  
                        {...register("email", {
                            required:"Email??? ??????????????????."
                        })}
                    />
                    <FormError message={formState?.errors?.email?.message} />
                    <Input
                        placeholder="Password" 
                        type="password"
                        onFocus={clearLoginError} 
                        {...register("password", {
                            required:"??????????????? ??????????????????.",
                            minLength:{
                                value:6,
                                message: "??????????????? 6??? ?????? ????????? ?????????.",
                            }, 
                            maxLength:{
                                value:20,
                                message: "??????????????? 20??? ?????? ????????? ?????????.",
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
                <Separator/>
                <GithubLogin>
                    <FontAwesomeIcon icon={faGithub} />
                    <span>Sign up with Github</span>
                </GithubLogin>
            </TopBox>
            <BottomBox 
                cta="Have an account?"
                link="/login"
                linkText="Log in"
            />
        </SLayout>
    )
}

export default SignUp;