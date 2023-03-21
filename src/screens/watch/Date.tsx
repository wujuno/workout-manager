import { TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 900px;
  padding: 0px 10px;
`;
const DateBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
  align-items: center;
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
      <DateBox>
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          {...register("date")}
        ></TextField>
      </DateBox>
      <Outlet />
    </Wrapper>
  );
}

export default Date;
