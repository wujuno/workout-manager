import { motion } from "framer-motion";
import React, { ReactComponentElement, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { BaseBox } from "../components/shared";
import {useAbs, useLegs, usePull, usePush, useShoulders} from "../hooks/useWorkoutParts";
import { gql, useMutation } from "@apollo/client";
import SubmitBtn from "../components/auth/SubmitBtn";
import Input from "../components/auth/Input";
const RecordWrapper = styled(BaseBox)`
    width:1000px;
    padding:20px 40px;
    form {
        display:flex;
        justify-content:center;
    }
`;
const RecordBoxes = styled(BaseBox)`
    margin-left:10px;
    padding:15px 20px;
    height:270px;
    overflow-y: auto;
`;
const DateBox = styled.div`
    width:100%
`;

const ListWrapper = styled.ul`
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const List = styled.li`
    padding:7px 6px;
    margin-bottom: 15px;
    border-radius: 20px;
    background-color: ${props=> props.theme.authBgColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-size: 13px;
    font-weight: 600;
    &:hover {
        border: 2px solid ${(props) => props.theme.accentColor};
    }
    cursor:pointer;
`;

const CountingWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    
    grid-column-gap: 1rem;
    padding:20px;
    text-align: center;
`;

const RecordSubmitBtn = styled(SubmitBtn)`
    grid-column: 1 / span 2
`;

const bigPartsArr = [
    {name: "가슴", id:1},
    {name: "등", id:2},
    {name: "어깨", id:3},
    {name: "하체", id:4},
    {name: "복근", id:5},
]

const countTitleArr = [
    {id:1, name:"setTimes"},
    {id:2, name:"times"},
    {id:3, name:"weight"},
    {id:4, name:"restTime"}
]

const CREATERECORD_MUTATION = gql`
    mutation createRecord(
        $date:String!, 
        $name:String!,
        $times: Int,
        $setTimes: Int,
        $weight: Int,
        $restTime: Int){
            createRecord(
                date:$date,
                name:$name,
                times:$times,
                setTimes:$setTimes,
                weight:$weight,
                restTime:$restTime,
            ) {
                ok
                error
            }
        }
`;

interface ILoginF {
    date: string
    times: string
    setTimes: string
    weight: string
    restTime: string
    [id:string]: string
}

interface IData {
    createRecord: {
        ok: boolean
        error: string
    }
}

function Record (){
    const today = new Date().toISOString().substring(0, 10);
   const {
    register,
    handleSubmit,
    getValues,
    setError} = useForm<ILoginF>({
        defaultValues:{
            date: today,
        }
    });
    const {data:pushData} = usePush();
    const {data:pullData} = usePull();
    const {data:legsData} = useLegs();
    const {data:shouldersData} = useShoulders();
    const {data:absData} = useAbs();
    const [bigPart, setBigPart] = useState("");
    const [name, setItem] = useState("");
    const bigPartHanddler = (event:React.MouseEvent) => {
        setBigPart(event.currentTarget.innerHTML);
    }
    const listHanddler = (event:React.MouseEvent) => {
        setItem(event.currentTarget.innerHTML);
    }
    const onCompleted = (data:IData) => {
        const {createRecord:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message: error,
            })
        }
        window.location.reload();

    }
    const [createRecord, {loading}] = useMutation(CREATERECORD_MUTATION,{onCompleted});
    const onvalid = () => {
        if(loading){
            return;
        }
        const {date,times,setTimes,weight,restTime} = getValues();
        createRecord({
            variables:{
                date,
                name,
                times:parseInt(times),
                setTimes:parseInt(setTimes),
                weight:parseInt(weight),
                restTime:parseInt(restTime),
            }
        })
    };
    return (
        <SLayout>
            <Helmet>
                <title>Record | WM</title>
            </Helmet>
            <RecordWrapper>
                <form onSubmit={handleSubmit(onvalid)}>
                <RecordBoxes>
                    <DateBox>
                        <input
                            type="date"
                            {...register("date",{required:true})}
                        />
                    </DateBox>
                </RecordBoxes>
                <RecordBoxes>
                    <ListWrapper>
                        {bigPartsArr.map(part=>
                            <List key={part.id} 
                                onClick={bigPartHanddler}>
                                {part.name}
                            </List>
                            )
                        }
                    </ListWrapper>                
                </RecordBoxes>
                <RecordBoxes>
                    <ListWrapper>
                        {bigPart === "가슴" 
                        ? pushData?.seePush?.map(list=>
                            <List key={list.id} onClick={listHanddler}>{list.name}</List>
                            )
                        : bigPart === "등" 
                        ? pullData?.seePull?.map(list=>
                            <List key={list.id} onClick={listHanddler}>{list.name}</List>
                            )
                        : bigPart === "어깨" 
                        ? shouldersData?.seeShoulders?.map(list=>
                            <List key={list.id} onClick={listHanddler}>{list.name}</List>
                            )
                        : bigPart === "하체" 
                        ? legsData?.seeLegs?.map(list=>
                            <List key={list.id} onClick={listHanddler}>{list.name}</List>
                            )
                        : bigPart === "복근" 
                        ? absData?.seeAbs?.map(list=>
                            <List key={list.id} onClick={listHanddler}>{list.name}</List>
                            )
                        : null
                        }
                    </ListWrapper>
                </RecordBoxes>
                <CountingWrapper>
                {countTitleArr.map(title=>
                    <label key={title.id} htmlFor={title.name}>{title.name}
                        <Input
                            key={title.id} 
                            type="number" 
                            id={title.name}
                            {...register(title.name)} 
                        />
                    </label>
                    )}
                <RecordSubmitBtn type="submit" value="등록" />
                </CountingWrapper>
                </form>
            </RecordWrapper>
        </SLayout>
    )
}

export default Record;