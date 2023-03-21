import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { SLink } from "../../components/shared";
import useSeeRecord from "../../hooks/useSeeRecord";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ListWrapper = styled.div`
  margin-top: 30px;
  padding: 0px 30px;
`;
const ListBoxHeader = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  span:first-child {
    grid-column: 1 / 3;
  }
`;
const ListBox = styled(ListBoxHeader)`
  hover {
    border: 1px solid rgba(255, 255, 255, 0.2);
    span:last-child {
      display: contents;
    }
  }
  span:last-child {
    display: none;
    cursor: pointer;
  }
`;
interface IData {
  deleteItem: {
    ok: boolean;
    error: string;
  };
}

const DELETEITEM_MUTATION = gql`
  mutation deleteItem($itemId: Int!, $recordId: Int!) {
    deleteItem(itemId: $itemId, recordId: $recordId) {
      ok
      error
    }
  }
`;

function SeeOneRecord() {
  const { date: paramsDate } = useParams();
  const { data } = useSeeRecord(paramsDate);
  const onCompleted = (data: IData) => {
    const {
      deleteItem: { ok, error },
    } = data;
    if (ok) {
      window.location.reload();
    }
  };
  const [deleteItem, { loading }] = useMutation(DELETEITEM_MUTATION, {
    onCompleted,
  });
  const deleteHanddler = (event: React.MouseEvent<HTMLSpanElement>) => {
    const itemId = Number(
      event.currentTarget.parentElement?.getAttribute("data-key")
    );
    if (loading) {
      return;
    }
    deleteItem({
      variables: {
        itemId,
        recordId: data?.seeRecord?.id,
      },
    });
  };
  const originOrder = data?.seeRecord?.items;
  console.log(originOrder);
  const [order, setOrder] = useState(originOrder);
  const onDragEnd = ({ destination, source }: DropResult) => {};
  return (
    <ListWrapper>
      {data?.seeRecord ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>종목 이름</TableCell>
                <TableCell align="right">세트 수(회)</TableCell>
                <TableCell align="right">회수 (회)</TableCell>
                <TableCell align="right">무게 (kg)</TableCell>
                <TableCell align="right">쉬는 시간 (초)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.seeRecord.items.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.setTimes}</TableCell>
                  <TableCell align="right">{item.times}</TableCell>
                  <TableCell align="right">{item.weight}</TableCell>
                  <TableCell align="right">{item.restTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <span>
          기록이 없습니다.{" "}
          <Link to="/record">
            <SLink>Go to Record</SLink>
          </Link>
        </span>
      )}
    </ListWrapper>
  );
}
export default SeeOneRecord;
