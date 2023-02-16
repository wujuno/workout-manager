import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { BaseBox } from "../components/shared";
import { gql, useMutation } from "@apollo/client";
import SubmitBtn from "../components/auth/SubmitBtn";
import Input from "../components/auth/Input";
import {
  Abs,
  Back,
  bigPartsArr,
  Chest,
  countTitleArr,
  Leg,
  Shoulder,
} from "../components/RecordParts";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

const RecordWrapper = styled(BaseBox)`
  width: 1000px;
  padding: 20px 40px;
  form {
    display: flex;
    justify-content: center;
  }
`;
const RecordBoxes = styled(BaseBox)`
  margin-left: 10px;
  padding: 15px 20px;
  height: 270px;
  overflow-y: auto;
`;
const DateBox = styled.div`
  width: 100%;
`;

const List = styled.li`
  padding: 7px 6px;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.authBgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 13px;
  font-weight: 600;
  &:hover {
    border: 2px solid ${(props) => props.theme.accentColor};
  }
  cursor: pointer;
`;

const CountingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-column-gap: 1rem;
  padding: 20px;
  text-align: center;
`;

const RecordSubmitBtn = styled(SubmitBtn)`
  grid-column: 1 / span 2;
`;

const CREATERECORD_MUTATION = gql`
  mutation createRecord(
    $date: String!
    $name: String!
    $times: Int
    $setTimes: Int
    $weight: Int
    $restTime: Int
  ) {
    createRecord(
      date: $date
      name: $name
      times: $times
      setTimes: $setTimes
      weight: $weight
      restTime: $restTime
    ) {
      ok
      error
    }
  }
`;

interface ILoginF {
  date: string;
  times: string;
  setTimes: string;
  weight: string;
  restTime: string;
  [id: string]: string;
}

interface IData {
  createRecord: {
    ok: boolean;
    error: string;
  };
}

function Record() {
  const today = new Date().toISOString().substring(0, 10);
  const { register, handleSubmit, getValues, setError } = useForm<ILoginF>({
    defaultValues: {
      date: today,
    },
  });
  const [bigPart, setBigPart] = useState("");
  const [name, setItem] = useState("");
  const bigPartHanddler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBigPart(String(event.currentTarget.ariaValueText));
    console.log(bigPart);
  };
  const listHanddler = (event: React.MouseEvent) => {
    setItem(event.currentTarget.innerHTML);
  };
  const onCompleted = (data: IData) => {
    const {
      createRecord: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    window.location.reload();
  };
  const [createRecord, { loading }] = useMutation(CREATERECORD_MUTATION, {
    onCompleted,
  });
  const onvalid = () => {
    if (loading) {
      return;
    }
    const { date, times, setTimes, weight, restTime } = getValues();
    createRecord({
      variables: {
        date,
        name,
        times: parseInt(times),
        setTimes: parseInt(setTimes),
        weight: parseInt(weight),
        restTime: parseInt(restTime),
      },
    });
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
              <TextField
                type="date"
                variant="outlined"
                required
                fullWidth
                {...register("date", { required: true })}
              ></TextField>
            </DateBox>
          </RecordBoxes>
          <RecordBoxes>
            <Stack direction="column" spacing={1}>
              {bigPartsArr.map((part) => (
                <Button
                  variant="outlined"
                  fullWidth
                  key={part.id}
                  onClick={bigPartHanddler}
                  aria-valuetext={part.name}
                >
                  {part.name}
                </Button>
              ))}
            </Stack>
          </RecordBoxes>
          <RecordBoxes>
            <Stack direction="column">
              {bigPart === "가슴"
                ? Chest.map((list) => (
                    <List key={list.id} onClick={listHanddler}>
                      {list.name}
                    </List>
                  ))
                : bigPart === "등"
                ? Back.map((list) => (
                    <List key={list.id} onClick={listHanddler}>
                      {list.name}
                    </List>
                  ))
                : bigPart === "어깨"
                ? Shoulder.map((list) => (
                    <List key={list.id} onClick={listHanddler}>
                      {list.name}
                    </List>
                  ))
                : bigPart === "하체"
                ? Leg.map((list) => (
                    <List key={list.id} onClick={listHanddler}>
                      {list.name}
                    </List>
                  ))
                : bigPart === "복근"
                ? Abs.map((list) => (
                    <List key={list.id} onClick={listHanddler}>
                      {list.name}
                    </List>
                  ))
                : null}
            </Stack>
          </RecordBoxes>
          <CountingWrapper>
            {countTitleArr.map((title) => (
              <TextField
                label={title.name}
                id={title.name}
                type="number"
                sx={{ m: 1 }}
                fullWidth
              />
            ))}
            <RecordSubmitBtn type="submit" value="등록" />
          </CountingWrapper>
        </form>
      </RecordWrapper>
    </SLayout>
  );
}

export default Record;
