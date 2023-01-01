import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";


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
    background-color: #ceefe6;
    border-radius:10px;
    padding:20px;

`;
const Item =styled.button`
    place-self:center;
`;

const DidList = styled.div`
    width:90%;
    margin-top:20px;
`;
const Count = styled.input`
    width:50px;
`;


function Record (){
    const [pushVisible, setPushVisible] = useState(false);
    const [pullVisible, setPullVisible] = useState(false);
    const [legsVisible, setLegsVisible] = useState(false);
    const [shoulderVisible, setShoulderVisible] = useState(false);
    const [absVisible, setAbsVisible] = useState(false);
    const [date, setDate] = useState('');
    const [item, setItem] = useState('');
    let arr:string[] = []
    function handleSubmit (event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }
    function handleDate (event:React.FormEvent<HTMLInputElement>) {
        setDate(event.currentTarget.value);
    }
    function handleItem (event:React.FormEvent<HTMLButtonElement>) {
        /* setItem(event.currentTarget.value); */
        arr.push(event.currentTarget.value);
        console.log(arr);
    }
    function handlePushItems () {
        setPushVisible(prev=>!prev);
        setPullVisible(false);
        setLegsVisible(false);
        setShoulderVisible(false);
        setAbsVisible(false);
    }
    function handlePullItems () {
        setPullVisible(prev=>!prev);
        setPushVisible(false);
        setLegsVisible(false);
        setShoulderVisible(false);
        setAbsVisible(false);
    }
    function handleLegsItems() {
        setLegsVisible(prev =>!prev);
        setPushVisible(false);
        setPullVisible(false);
        setShoulderVisible(false);
        setAbsVisible(false);
    }
    function handleshoulderItems() {
        setShoulderVisible(prev => !prev)
        setPushVisible(false);
        setPullVisible(false);
        setLegsVisible(false);
        setAbsVisible(false);
    }
    function handleabsItems() {
        setAbsVisible(prev=>!prev);
        setPushVisible(false);
        setPullVisible(false);
        setLegsVisible(false);
        setShoulderVisible(false);
    }
    return (
        <SLayout>
            <Container>
                <Title>
                    <p>아래에 운동 내용을 기록하세요!</p>
                </Title>
                <Form onSubmit={handleSubmit}>
                    <div>
                    <input type="date" onChange={handleDate} />
                    </div>
                    <div>
                        <button onClick={handlePushItems}>미는 운동</button>
                        <button onClick={handlePullItems}>당기는 운동</button>
                        <button onClick={handleLegsItems}>하체 운동</button>
                        <button onClick={handleshoulderItems}>어깨 운동</button>
                        <button onClick={handleabsItems}>복근 운동</button>
                    </div>
                    {pushVisible ? <Items>
                        <Item onClick={handleItem} value="플랫 벤치프레스">플랫 벤치프레스</Item>
                        <Item onClick={handleItem} value="인클라인 벤치프레스">인클라인 벤치프레스</Item>
                        <Item onClick={handleItem} value="딥스">딥스</Item>
                        <Item onClick={handleItem} value="케이블 플라이">케이블 플라이</Item>
                        <Item onClick={handleItem} value="머신 플라이">머신 플라이</Item>
                        <Item onClick={handleItem} value="플랫벤치 덤벨프레스">플랫벤치 덤벨프레스</Item>
                    </Items>  :null}
                    {pullVisible ? <Items>
                        <Item>턱걸이</Item>
                        <Item>랫 풀 다운</Item>
                        <Item>데드리프트</Item>
                        <Item>바벨 로우</Item>
                        <Item>시티드 케이블 로우</Item>
                        <Item>머신 로우</Item>
                    </Items>  :null}
                    {legsVisible ? <Items>
                        <Item>바벨 스쿼트</Item>
                        <Item>파워 레그 프레스</Item>
                        <Item>시티드 레그 컬</Item>
                        <Item>리버스 레그 컬</Item>
                        <Item>런지</Item>
                    </Items>  :null}
                    {shoulderVisible ? <Items>
                        <Item>바벨 숄더 프레스</Item>
                        <Item>밀리터리 프레스</Item>
                        <Item>사이드 레터럴 레이즈</Item>
                        <Item>리버스 펙 덱 플라이</Item>
                        <Item>페이스 풀</Item>
                    </Items>  :null}
                    {absVisible ? <Items>
                        <Item>리버스 크런치</Item>
                        <Item>행잉 레그 레이즈</Item>
                    </Items>  :null}
                    <DidList>
                        <p>{date}</p>
                        {item ? 
                        <p>{item} -
                        무게 : <Count type="number" placeholder="kg"/>| 
                        횟수 : <Count type="number" placeholder="회"/>|
                        세트수 : <Count type="number" placeholder="회"/>|
                        쉬는시간 : <Count type="number" placeholder="초"/>
                        </p> : null}
                    </DidList>
                    <input type="submit" value="등록"/>
                </Form>
            </Container>
        </SLayout>
    )
}

export default Record;