import styled from "styled-components";
import { useForm } from "react-hook-form"
import SLayout from "../components/Layout";



const Banner = styled.div`
    margin-top:300px;
    width:640px;
    height: 300px;

`;

const Title = styled.p`
    font-size:40px;
    font-weight:700;
    display:flex;
    justify-content: space-between;
    span: last-child {
        font-size:25px;
    }
    align-items:end;
`;

const FormContainer = styled.div`
    display:flex;
    justify-content:center;
    margin:10px;
`;
const LoginForm = styled.form`
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin-top:20px;
    input {
        width:80%;
        padding:15px;
        border-radius:4px;
        margin-bottom:10px;
    }
    input:last-child {
        margin-top:20px;
        font-size:17px;
        font-weight:500;
    }
`;

interface ISignUpF {
    id: string
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
            <Banner>
                <div>
                    <Title>
                        <span>SignUp</span>
                        <span>Workout Manager</span>
                    </Title>
                    <hr/>
                </div>
                <FormContainer>
                <LoginForm onSubmit={handleSubmit(onvalid)}>
                    <input
                        placeholder="ID"
                        type="text"  
                        {...register("id", {required:true})}
                         />
                    <input
                        placeholder="Username"
                        type="text"  
                        {...register("username", {required:true})}
                         />
                    <input
                        placeholder="Password" 
                        type="password" 
                        {...register("password", {required:true})} />
                    <input
                        placeholder="Confirm Password" 
                        type="password" 
                        {...register("password2", {required:true})} />
                    <input type="submit" value="Login" />
                </LoginForm>
                </FormContainer>
            </Banner>
        </SLayout>
    )
}

export default SignUp;