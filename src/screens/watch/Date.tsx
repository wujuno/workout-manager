import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div`
    margin-top:20px;
    width:100%;
    padding:0px 10px;
`;
const Container = styled.div`
    display:flex;
    flex-direction: column;
`;
const Input = styled.input`
    margin-top:10px;
    width:200px;
    font-size:30px;
`;


function Date() {
    const {date:paramsDate} = useParams();
    const {register, watch} = useForm({
        defaultValues:{date:paramsDate}
    });
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(`${watch("date")}`);
    },[watch("date")]);
    return (
        <Wrapper>
            <Container>
            <span>기록을 확인하고 싶은 날짜를 선택해주세요.</span>       
                <Input 
                    type="date" 
                    {...register("date")} /> 
            <Outlet />
            </Container>
        </Wrapper>
    )
    
}

export default Date;