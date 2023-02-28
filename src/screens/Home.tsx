import { useReactiveVar } from "@apollo/client";
import { Paper, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loggedInVar } from "../apollo";
import SLayout from "../components/Layout";
import { BaseBox } from "../components/shared";
import useUser from "../hooks/useUser";
import LogIn from "./Login";

const HomeBaseBox = styled(BaseBox)`
  width: 600px;
  padding: 20px 30px;
  box-shadow: ${(props) => props.theme.headerShadow};
  border-radius: 4px;
`;

const MiddleBox = styled(HomeBaseBox)`
  margin-top: 10px;
  span {
    font-weight: 600;
  }
`;
const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HistoryBox = styled.div`
  padding: 15px 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  span {
    font-size: 15px;
  }
  margin-top: 20px;
  max-width: 480px;
  width: 480px;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.headerShadow};
`;

const DateBox = styled.div`
  padding: 2px 5px;
  border: 0.2px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListBox = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 20px;
  text-align: center;
`;

function Home() {
  const isLoggedIn = useReactiveVar(loggedInVar);
  const { data } = useUser();
  return isLoggedIn ? (
    <SLayout>
      <Helmet>
        <title>Home | WM</title>
      </Helmet>

      <div>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h4">
            안녕하세요, {data?.me?.username}님.{" "}
          </Typography>
        </Paper>
        <MiddleBox>
          <span>{data?.me?.username}님의 최근 운동기록입니다.</span>
          <HistoryWrapper>
            {data?.me?.records?.map((record) => (
              <Link to={`watch/${data?.me?.username}/sdate/${record?.date}`}>
                <HistoryBox>
                  <DateBox>
                    <span>{record?.date}</span>
                  </DateBox>
                  <ListBox>
                    {record?.items?.map((item) => (
                      <span key={item?.id}>{item.name}</span>
                    ))}
                  </ListBox>
                </HistoryBox>
              </Link>
            ))}
          </HistoryWrapper>
        </MiddleBox>
      </div>
    </SLayout>
  ) : (
    <LogIn />
  );
}

export default Home;
