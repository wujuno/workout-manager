import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { SLink } from "../../components/shared";
import useSeeRecord from "../../hooks/useSeeRecord";
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
  const onRowBlur = (event: React.MouseEvent<HTMLTableCellElement>) => {
    console.log(event);
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
  return (
    <ListWrapper>
      {data?.seeRecord ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>종목 이름</TableCell>
                <TableCell align="center">세트 수(회)</TableCell>
                <TableCell align="center">회수 (회)</TableCell>
                <TableCell align="center">무게 (kg)</TableCell>
                <TableCell align="center">쉬는 시간 (초)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.seeRecord.items.map((item) => (
                <TableRow
                  key={item.name}
                  data-key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    console.log(`${item.id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.setTimes}</TableCell>
                  <TableCell align="center">{item.times}</TableCell>
                  <TableCell align="center">{item.weight}</TableCell>
                  <TableCell align="center">{item.restTime}</TableCell>
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
