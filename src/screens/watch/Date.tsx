import { TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 300px;
  padding: 0px 10px;
`;

function Date() {
  const { date: paramsDate } = useParams();
  const { register, watch } = useForm({
    defaultValues: { date: paramsDate },
  });
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${watch("date")}`);
  }, [watch("date")]);
  return (
    <Wrapper>
      <TextField
        type="date"
        variant="outlined"
        {...register("date")}
      ></TextField>
      <Outlet />
    </Wrapper>
  );
}

export default Date;
