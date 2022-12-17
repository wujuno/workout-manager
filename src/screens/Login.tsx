import styled from "styled-components";
import { useForm } from "react-hook-form"

const Wrapper = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    justify-content:center;
    position: absolute;
    top:0px;
    z-index:-1
`; 

const Banner = styled.div`
    margin-top:300px;
    width:760px;
    height: 300px;

`;

const Title = styled.p`
    font-size:40px;
    font-weight:700;
    display:flex;
    justify-content: space-between;
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
interface ILoginF {
    userId: string
    password: string
}

function LogIn (){
    const { register, handleSubmit } = useForm<ILoginF>();
    const onvalid = (data:ILoginF) => {
        console.log(data);
    }
    return (
        <Wrapper>
            <Banner>
                <div>
                    <Title>
                        <span>Workout Manager</span>
                        <span>Login</span>
                    </Title>
                    <hr/>
                </div>
                <FormContainer>
                <LoginForm onSubmit={handleSubmit(onvalid)}>
                    <input
                        placeholder="ID"
                        type="text"  
                        {...register("userId", {required:true})}
                         />
                    <input
                        placeholder="Password" 
                        type="password" 
                        {...register("password", {required:true})} />
                    <input type="submit" value="Login" />
                </LoginForm>
                </FormContainer>
            </Banner>
        </Wrapper>
    )
}

export default LogIn;