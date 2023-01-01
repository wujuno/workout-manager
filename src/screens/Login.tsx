import styled from "styled-components";
import { useForm } from "react-hook-form";
import { loggedInVar } from "../apollo";
import { useNavigate } from "react-router-dom";
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
}

function LogIn (){
    const { register, handleSubmit } = useForm<ILoginF>();
    const navigate = useNavigate();
    const loginHanddler = () => {
        loggedInVar(true);
        navigate("/")
    }
    const onvalid = (data:ILoginF) => {
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
                        placeholder="Password" 
                        type="password" 
                        {...register("password", {required:true})} />
                    <SubmitBtn type="submit" value="Login" />
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