import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width:100vw;
    height: 100vh;
    background-color: #d7cc7a;
    display: flex;
    justify-content:center;
    position: absolute;
    top:0px;
    z-index:-1
`; 

const Container = styled.div`
    margin-top:100px;
    width:1020px;
    height: 600px;
    border: 2px solid tomato;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Title = styled.div`
    margin-top:20px;
    font-size:50px;
`;

const Form = styled.form`
    margin-top:20px;
    width:960px;
    height:500px;
    border:1px solid green;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Items = styled(motion.div)`
    width:90%;
    display:grid;
    grid-template-columns:repeat(5,1fr);
    grid-row-gap:1rem;
    margin-top:15px;
    background-color:white;
    border-radius:10px;
    padding:20px;

`;
const Item =styled.span`
    place-self:center;
`;

function Record (){
    const [pushVisible, setPushVisible] = useState(false);
    const [pullVisible, setPullVisible] = useState(false);
    function handleSubmit (event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }
    function handlePushItems () {
        setPushVisible(prev=>!prev);
        setPullVisible(false);
    }
    function handlePullItems () {
        setPullVisible(prev=>!prev);
        setPushVisible(false);
    }
    return (
        <Wrapper>
            <Container>
                <Title>
                    <p>아래에 운동 내용을 기록하세요!</p>
                </Title>
                <Form onSubmit={handleSubmit}>
                    <div>
                    <input type="date" />
                    </div>
                    <div>
                        <button onClick={handlePushItems}>미는 운동</button>
                        <button onClick={handlePullItems}>당기는 운동</button>
                        <button>하체 운동</button>
                        <button>어깨 운동</button>
                        <button>복근 운동</button>
                    </div>
                    {pushVisible ? <Items>
                        <Item>플랫 벤치프레스</Item>
                        <Item>인클라인 벤치프레스</Item>
                        <Item>딥스</Item>
                        <Item>케이블 플라이</Item>
                        <Item>머신 플라이</Item>
                        <Item>플랫벤치 덤벨프레스</Item>
                    </Items>  :null}
                    {pullVisible ? <Items>
                        <Item>턱걸이</Item>
                        <Item>랫 풀 다운</Item>
                        <Item>데드리프트</Item>
                        <Item>바벨 로우</Item>
                        <Item>시티드 케이블 로우</Item>
                        <Item>머신 로우</Item>
                    </Items>  :null}
                </Form>
            </Container>
        </Wrapper>
    )
}

export default Record;