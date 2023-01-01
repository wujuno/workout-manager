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

const GithubLogin = styled.div`
  display: flex;
  justify-content:center;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;


interface ISignUpF {
    email: string
    username: string
    password: string
    password2: string
}

function SignUp (){
    const { register, handleSubmit } = useForm<ISignUpF>();
    const onvalid = (data:ISignUpF) => {
    }
    return (
        <SLayout>
            <TopBox>
            <STitle title="Workout Manager" />
                <FormBox>
                <form onSubmit={handleSubmit(onvalid)}>
                    <Input
                        placeholder="Username"
                        type="text"  
                        {...register("username", {required:true})}
                         />
                    <Input
                        placeholder="Email"
                        type="text"  
                        {...register("email", {required:true})}
                         />
                    <Input
                        placeholder="Password" 
                        type="password" 
                        {...register("password", {required:true})} />
                    <Input
                        placeholder="Confirm Password" 
                        type="password" 
                        {...register("password2", {required:true})} />
                    <SubmitBtn type="submit" value="Login" />
                </form>
                </FormBox>
                <Separator/>
                <GithubLogin>
                    <FontAwesomeIcon icon={faGithub} />
                    <span>Sign up with Github</span>
                </GithubLogin>
            </TopBox>
            <BottomBox 
                cta="Do you have an account?"
                link="/login"
                linkText="Log in"
            />
        </SLayout>
    )
}

export default SignUp;