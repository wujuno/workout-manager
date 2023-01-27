import { gql, useMutation } from "@apollo/client";
import { Link, useParams} from "react-router-dom";
import styled from "styled-components";
import { SLink } from "../../components/shared";
import useSeeRecord from "../../hooks/useSeeRecord";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useState } from "react";

const ListWrapper = styled.div`
    margin-top: 30px;
    padding: 0px 30px;
`;
const ListBoxHeader = styled.div`
    padding: 10px 0px;
    display:grid;
    grid-template-columns: repeat(7,1fr);
    text-align:center;
    span:first-child {
        grid-column: 1 / 3
    }

`;
const ListBox = styled(ListBoxHeader)`
    &: hover {
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: ${props => props.theme.headerShadow};
        span:last-child {
            display: contents;
        }
    }
    span:last-child {
        display:none;
        cursor: pointer;
    }
` 
interface IData {
    deleteItem: {
        ok:boolean
        error:string
    }
}

const DELETEITEM_MUTATION =gql`
    mutation deleteItem($itemId:Int!, $recordId:Int!){
        deleteItem(itemId:$itemId, recordId:$recordId){
            ok
            error
        }
    }
`;
    

function SeeOneRecord () {
    const {date:paramsDate} = useParams();
    const {data} = useSeeRecord(paramsDate);
    const onCompleted = (data:IData) => {
        const {deleteItem:{ok,error}} = data;
        if(ok){
            window.location.reload();
        }
    }
    const [deleteItem, {loading}] = useMutation(DELETEITEM_MUTATION,{onCompleted})
    const deleteHanddler = (event:React.MouseEvent<HTMLSpanElement>) => {
        const itemId = Number(event.currentTarget.parentElement?.getAttribute("data-key"));
        if(loading){
            return;
        }
        deleteItem({
            variables: {
                itemId,
                recordId:data?.seeRecord?.id
            }
        })
    }
    const originOrder = data?.seeRecord?.items;
    console.log(originOrder);
    const [order, setOrder] = useState(originOrder);
    const onDragEnd = ({destination, source}:DropResult) => {
        
    }; 
    return (
        <ListWrapper>
            {data?.seeRecord 
                ?<div>
                        <ListBoxHeader>
                                <span>이름</span>
                                <span>세트수(회)</span>
                                <span>횟수(회)</span>
                                <span>무게(kg)</span>
                                <span>쉬는시간(초)</span>
                            </ListBoxHeader>
                            <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="one">
                                {(magic)=>(
                                <div ref={magic.innerRef} {...magic.droppableProps}>
                                    {data?.seeRecord?.items.map(
                    item => (                          
                            <Draggable draggableId={item.name} index={item.id} key={item.id} >
                                {(magic)=>(
                                <ListBox 
                                    data-key={item.id} 
                                    key={item.id}
                                    ref={magic.innerRef}
                                    {...magic.dragHandleProps}
                                    {...magic.draggableProps}
                                >
                                <span>{item.name}</span>
                                <span>{item.setTimes}</span>
                                <span>{item.times}</span>
                                <span>{item.weight}</span>
                                <span>{item.restTime}</span>
                                <span onClick={deleteHanddler}>❌</span>
                            </ListBox>
                            )}
                            </Draggable>                         
                    )
                    )}
                    {magic.placeholder}
                                    </div>
                                    )}
                            </Droppable>
                    </DragDropContext>
                </div>
                : <span>기록이 없습니다. <Link to="/record"><SLink>Go to Record</SLink></Link></span>
            }
        </ListWrapper>
    )
}
export default SeeOneRecord;