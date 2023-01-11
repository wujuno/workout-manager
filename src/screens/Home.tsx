import { useReactiveVar } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loggedInVar } from "../apollo";
import SLayout from "../components/Layout";
import { BaseBox } from "../components/shared";
import useUser from "../hooks/useUser";


const HomeBaseBox = styled(BaseBox)`
    width:600px;
    padding: 20px 30px;
    box-shadow: ${props => props.theme.headerShadow};
    border-radius:4px;
`;
const TopBox = styled(HomeBaseBox)`
    font-size:25px;
    font-weight:600;
    
`;
const MiddleBox = styled(HomeBaseBox)`
    margin-top:10px;
    span{
        font-weight:600;
    }
`;
const HistoryWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`;
const HistoryBox = styled.div`
    padding:15px 20px;
    border: 1px solid ${props=>props.theme.borderColor};
    border-radius:20px;
    display: flex;
    flex-direction: column;
    span {
        font-size:15px;
    }
    margin-top:20px;
    max-width:480px;
    width:100%;
    cursor:pointer;
    box-shadow: ${props => props.theme.headerShadow};
`
const DateBox = styled.div`
    padding:2px 5px;
    border: 0.2px solid ${props=>props.theme.borderColor};
    border-radius:10px;
    width:100px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const ListBox = styled.div`
    margin-top:15px;
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-auto-rows:20px;
    text-align:center;
    
`;
const Nothing = styled.div`
    margin-top:15px;
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
  box-shadow:${props => props.theme.headerShadow};
`;


function Home (){
    const isLoggedIn = useReactiveVar(loggedInVar);
    const {data} = useUser();
    return (
        <SLayout>
            <Helmet>
                <title>Home | WM</title>
            </Helmet>
                {isLoggedIn 
                ? <div>
                    <TopBox>
                        <p>안녕하세요, {data?.me?.username}님. </p>
                        <p>오늘 컨디션은 어떤가요?</p>
                        <form>
                        <select>
                            <option value="good">good</option>
                            <option value="bad">bad</option>
                        </select>
                        </form>
                    </TopBox>
                    <MiddleBox>
                        <span>{data?.me?.username}님의 최근 운동기록입니다.</span>
                        <HistoryWrapper>
                            {data?.me?.records?.map(
                                record => 
                                    <Link to={`watch/${data?.me?.username}/sdate/${record?.date}`}>
                                        <HistoryBox>
                                        <DateBox><span >{record?.date}</span></DateBox>
                                        <ListBox>
                                            {record?.items?.map(
                                                item => 
                                                    <span key={item?.id}>{item.name}</span>
                                                
                                            )}
                                        </ListBox>
                                    </HistoryBox>
                                    </Link>
                            )}
                        </HistoryWrapper>
                    </MiddleBox>
                </div> 
                : <TopBox>
                    <span>안녕하세요 😃</span>
                    <p>로그인 하여 Workout Manager를 즐겨보세요.</p>
                    <Nothing>
                        <Link to="/login"><Button>Log in</Button></Link>
                    </Nothing>
                </TopBox>
                }
            
        </SLayout>
    )
}

export default Home;