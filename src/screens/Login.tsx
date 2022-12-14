import styled from "styled-components";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import { useLocation, useNavigate } from "react-router-dom";
import SLayout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import TopBox from "../components/auth/TopBox";
import STitle from "../components/auth/Title";
import FormBox from "../components/auth/Formbox";
import Input from "../components/auth/Input";
import SubmitBtn from "../components/auth/SubmitBtn";
import Separator from "../components/auth/Separator";
import BottomBox from "../components/auth/BottomBox";
import FormError from "../components/auth/FormError";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";

const GithubLogin = styled.div`
  display: flex;
  justify-content:center;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface ILoginF {
    username: string
    password: string
    [id:string]: string
}
interface IData {
    login: {
        ok: boolean
        error: string
        token: string
    }
}

const Notification = styled.div`
    color: #01a862;
    font-weight: 600;
    font-size: 12px;
    margin: 5px 0px 10px 0px;
`;

const LOGIN_MUTATION = gql`
    mutation login($username:String!, $password:String!){
        login(username:$username, password:$password){
            ok
            token
            error
        }
    }
`;

function LogIn (){
    const navigate = useNavigate();
    const location = useLocation();
    const { register, 
            handleSubmit,
            setValue,
            formState,
            getValues,
            setError,
            clearErrors } = useForm<ILoginF>({
                mode:"onChange",
                defaultValues:{
                    username:location?.state?.username || "",
                    password:location?.state?.password || "",
                }
            });
    const onCompleted = (data:IData) => {
        const {login:{error,ok,token}} = data;
        if(!ok){
            return setError("result",{
                message: error,
            })
        }
        if(token){
            logUserIn(token);
            navigate("/");
        }
    }
    const [login, {loading}] = useMutation(LOGIN_MUTATION,{onCompleted});
    const onvalid = () => {
        if(loading){
            return;
        }
        const {username, password} = getValues();
        login({
            variables:{
                username,
                password,
            }
        })
        setValue("username","");
        setValue("password","");
        

    }
    const clearLoginError = () => clearErrors("result");
    return (
        <SLayout>
            <Helmet>
                <title>Login | WM</title>
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
                        value={loading ? "Loading..." : "Log in"}
                        disabled={!formState.isValid || loading} 
                    />
                    <FormError message={formState?.errors?.result?.message} />
                    <Notification>{location?.state?.message}</Notification> 
                </form>
                </FormBox>
                <Separator/>
                <GithubLogin>
                    <FontAwesomeIcon icon={faGithub} />
                    <span>Log in with Github</span>
                </GithubLogin>
            </TopBox>
            <BottomBox 
                cta="Don't have an account?"
                link="/signup"
                linkText="Sign Up"
            />
        </SLayout>
    )
}

export default LogIn;