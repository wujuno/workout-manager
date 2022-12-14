import { Link, useOutletContext, useParams} from "react-router-dom";
import styled from "styled-components";
import useSeeRecord from "../../hooks/useSeeRecord";


const ListWrapper = styled.div`
    margin-top: 30px;
    padding: 0px 30px;
`;
const ListBox = styled.div`
    padding: 10px 0px;
    display:grid;
    grid-template-columns: repeat(6,1fr);
    text-align:center;
    span:first-child {
        grid-column: 1 / 3
    }
`;
const SLink = styled.span`
    text-decoration: underline;
    color: ${props => props.theme.accentColor};
    font-weight: 600;
`;

interface IOutletContext {
    date: string
}

function SeeOneRecord () {
    const {date:paramsDate} = useParams();
    console.log(paramsDate);
    const {date} = useOutletContext<IOutletContext>();
    const {data} = useSeeRecord(paramsDate);
    return (
        <ListWrapper>
                {data?.seeRecord 
                    ?<div>
                            <ListBox>
                                    <span>이름</span>
                                    <span>세트수(회)</span>
                                    <span>횟수(회)</span>
                                    <span>무게(kg)</span>
                                    <span>쉬는시간(초)</span>
                                </ListBox>
                            {data?.seeRecord?.items.map(
                        item => (
                          
                                <ListBox>
                                    <span>{item.name}</span>
                                    <span>{item.setTimes}</span>
                                    <span>{item.times}</span>
                                    <span>{item.weight}</span>
                                    <span>{item.restTime}</span>
                                </ListBox>
                          
                        )
                    )}
                    </div>
                    : <span>기록이 없습니다. <Link to="/record"><SLink>Go to Record</SLink></Link></span>
                }
            </ListWrapper>
    )
}

export default SeeOneRecord;