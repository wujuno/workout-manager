import { Button, Paper } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import SLayout from "../../components/Layout";
import { BaseBox } from "../../components/shared";

const Wrapper = styled(BaseBox)`
  width: 900px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WatchHeader = styled(Paper)`
  display: flex;
  padding: 10px 0;
  width: 100%;
  justify-content: space-around;
`;

function Watch() {
  return (
    <SLayout>
      <Helmet>
        <title>Watch | WM</title>
      </Helmet>
      <Wrapper>
        <WatchHeader>
          <Link to="sdate">
            <Button variant="outlined">특정날짜 기록</Button>
          </Link>
          <Link to="allnames">
            <Button variant="outlined">운동 종목별 기록</Button>
          </Link>
          <Button variant="outlined" disabled>
            <Link to="sdate33">준비중</Link>
          </Button>
          <Button variant="outlined" disabled>
            <Link to="sdate33">준비중</Link>
          </Button>
        </WatchHeader>
        <Outlet />
      </Wrapper>
    </SLayout>
  );
}

export default Watch;
