import { motion } from "framer-motion";
import React, { ReactComponentElement, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { BaseBox } from "../components/shared";
import {usePull, usePush} from "../hooks/useWorkoutParts";
import { gql, useMutation } from "@apollo/client";
import SubmitBtn from "../components/auth/SubmitBtn";

const RecordWrapper = styled(BaseBox)`
    width:1000px;
    padding:20px 40px;
    form {
        display:flex;
        justify-content:center;
    }
`;
const RecordBoxes = styled(BaseBox)`
    width:250px;
    height:500px;
    margin-left:10px;
    padding:15px 20px;
`;
const DateBox = styled.div`
    width:100%
`;

const ListWrapper = styled.ul`
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
        padding:7px 6px;
        margin-bottom: 15px;
        border-radius: 20px;
        background-color: ${props=> props.theme.authBgColor};
        border: 1px solid ${(props) => props.theme.borderColor};
        font-size: 13px;
        font-weight: 600;
        cursor:pointer;
    }
`;

const CountingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

interface IData {
    createRecord: {
        ok: boolean
        error: string
    }
}

function Record (){
   const {
    register,
    handleSubmit,
    getValues,
    setError} = useForm();
    const {data:pushData} = usePush();
    const {data:pullData} = usePull();
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
                            <li key={part.id} 
                                onClick={bigPartHanddler}>
                                {part.name}
                            </li>
                            )
                        }
                    </ListWrapper>                
                </RecordBoxes>
                <RecordBoxes>
                    <ListWrapper>
                    {pushData?.seePush?.map(list=>
                            <li key={list.id} onClick={listHanddler}>{list.name}</li>
                            )
                        }
                    </ListWrapper>
                </RecordBoxes>
                <CountingWrapper>
                {countTitleArr.map(title=>
                    <label key={title.id} htmlFor={title.name}>{title.name}
                        <input
                            key={title.id} 
                            type="number" 
                            id={title.name}
                            {...register(title.name)} 
                        />
                    </label>
                    )}
                <SubmitBtn type="submit" value="등록" />
                </CountingWrapper>
                </form>
            </RecordWrapper>
        </SLayout>
    )
}

export default Record;