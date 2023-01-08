import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { BaseBox } from "../components/shared";
import {usePull, usePush} from "../hooks/useWorkoutParts";

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

const ListWrapper = styled.div`
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
        padding:7px 6px;
        border-radius: 20px;
        background-color: ${props=> props.theme.authBgColor};
        border: 1px solid ${(props) => props.theme.borderColor};
        font-size: 13px;
        cursor:pointer;
    }
`;

function Record (){
   const {
    register,
    handleSubmit} = useForm()
    const {data:pushData} = usePush();
    const {data:pullData} = usePull();
    return (
        <SLayout>
            <Helmet>
                <title>Record | WM</title>
            </Helmet>
            <RecordWrapper>
                <form>
                <RecordBoxes>
                    <DateBox>
                        <input
                            type="date"
                            {...register("date",{required:true})}
                        />
                    </DateBox>
                </RecordBoxes>
                <RecordBoxes>
                    <div>
                        <ul>
                            <li><span>가슴</span></li>
                            <li><span>등</span></li>
                            <li><span>어깨</span></li>
                            <li><span>하체</span></li>
                            <li><span>복근</span></li>
                        </ul>
                    </div>
                </RecordBoxes>
                <RecordBoxes>
                    {pushData?.seePush?.map(list=>
                        <ListWrapper>
                            <span>{list.name}</span>
                        </ListWrapper>
                        )
                    }
                </RecordBoxes>
              
                </form>
             
            </RecordWrapper>
           
        </SLayout>
    )
}

export default Record;