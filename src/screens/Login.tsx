import styled from "styled-components";
import { useForm } from "react-hook-form";
import { loggedInVar } from "../apollo";
import { Link, useNavigate } from "react-router-dom";
import SLayout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { BaseBox } from "../components/shared";

const TopBox = styled(BaseBox)`
    padding: 30px 40px;
`;

const Title = styled.p`
    font-size:40px;
    font-weight:700;
    display:flex;
    justify-content: center;
    font-size: 25px;
`;

const FormContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
    form {
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        margin-top:35px;
    }
`;

const Input = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid ${(props) => props.theme.borderColor};
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 14px;
    }
`;
const SubmitBtn = styled.input`
    border: none;
    border-radius: 3px;
    margin-top: 13px;
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props)=> props.theme.bgColor};
    text-align: center;
    padding: 11px 0px;
    font-weight: 600;
    width: 100%;
`;

const SSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;
const GithubLogin = styled.div`
  display: flex;
  justify-content:center;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const SBottomBox = styled(BaseBox)`
    margin-top:15px;
    font-size:14px;
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        margin-left: 5px;
        color: ${(props) => props.theme.accentColor};
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
                <Title>
                    <span>Workout Manager</span>
                </Title>                   
                <FormContainer>
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
                </FormContainer>
                <SSeparator>
                    <div></div>
                    <span>Or</span>
                    <div></div>
                </SSeparator>
                <GithubLogin>
                    <FontAwesomeIcon icon={faGithub} />
                    <span>Log in with Github</span>
                </GithubLogin>
            </TopBox>
            <SBottomBox>
                <span>Do you have an account?</span>
                <Link to="signup">Sign Up</Link>
            </SBottomBox>
        </SLayout>
    )
}

export default LogIn;