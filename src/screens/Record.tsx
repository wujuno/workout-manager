import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SLayout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { BaseBox } from "../components/shared";
import { gql, useMutation } from "@apollo/client";
import {
  Abs,
  Back,
  bigPartsArr,
  Chest,
  countTitleArr,
  Leg,
  Shoulder,
} from "../components/RecordParts";
import { Button, Grid, Paper, Stack, TextField } from "@mui/material";

const RecordWrapper = styled(BaseBox)`
  width: 1000px;
  padding: 20px 40px;
  form {
    display: flex;
    justify-content: center;
  }
`;

const CountingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-column-gap: 1rem;
  padding: 20px;
  text-align: center;
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
  };
  const listHanddler = (event: React.MouseEvent) => {
    setItem(event.currentTarget.innerHTML);
    console.log(event.currentTarget.innerHTML);
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
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                type="date"
                variant="outlined"
                required
                fullWidth
                {...register("date", { required: true })}
              ></TextField>
            </Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              <Paper
                elevation={1}
                sx={{ p: 2, height: 220, overflowY: "auto" }}
              >
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
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={1}
                sx={{ p: 2, height: 220, overflowY: "auto" }}
              >
                <Stack direction="column">
                  {bigPart === "가슴"
                    ? Chest.map((list) => (
                        <Button
                          color={name === list.name ? "success" : "primary"}
                          fullWidth
                          key={list.id}
                          onClick={listHanddler}
                        >
                          {list.name}
                        </Button>
                      ))
                    : bigPart === "등"
                    ? Back.map((list) => (
                        <Button fullWidth key={list.id} onClick={listHanddler}>
                          {list.name}
                        </Button>
                      ))
                    : bigPart === "어깨"
                    ? Shoulder.map((list) => (
                        <Button fullWidth key={list.id} onClick={listHanddler}>
                          {list.name}
                        </Button>
                      ))
                    : bigPart === "하체"
                    ? Leg.map((list) => (
                        <Button fullWidth key={list.id} onClick={listHanddler}>
                          {list.name}
                        </Button>
                      ))
                    : bigPart === "복근"
                    ? Abs.map((list) => (
                        <Button fullWidth key={list.id} onClick={listHanddler}>
                          {list.name}
                        </Button>
                      ))
                    : null}
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={1}
                sx={{ p: 2, height: 220, overflowY: "auto" }}
              >
                <CountingWrapper>
                  {countTitleArr.map((title) => (
                    <TextField
                      label={title.name}
                      id={title.name}
                      type="number"
                      sx={{ m: 1, width: "100px" }}
                      fullWidth
                    />
                  ))}
                </CountingWrapper>
              </Paper>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button variant="contained" type="submit" size="large" fullWidth>
                등록
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </form>
      </RecordWrapper>
    </SLayout>
  );
}

export default Record;
