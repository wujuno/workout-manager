import { Button } from "@mui/material";
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

const WatchHeader = styled(BaseBox)`
  padding: 15px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 4rem;
  text-align: center;
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
          <Button variant="outlined" disabled>
            <Link to="sdate33">준비중</Link>
          </Button>
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
