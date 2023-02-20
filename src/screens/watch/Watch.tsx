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

const HeaderTitle = styled.div`
  padding: 8px 0px;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 20px;
  font-weight: 600;
  &:hover {
    border: 2px solid ${(props) => props.theme.accentColor};
  }
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
          <Link to="sdate33">
            <Button variant="outlined" disabled>
              준비중
            </Button>
          </Link>
          <Link to="sdate33">
            <Button variant="outlined" disabled>
              준비중
            </Button>
          </Link>
          <Link to="sdate33">
            <Button variant="outlined" disabled>
              준비중
            </Button>
          </Link>
        </WatchHeader>
        <Outlet />
      </Wrapper>
    </SLayout>
  );
}

export default Watch;
