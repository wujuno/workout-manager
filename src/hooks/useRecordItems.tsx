import { gql, useQuery } from "@apollo/client";

const SEERECORD_QUERY = gql`
  query seeRecord {
    seeRecords {
      items {
        id
        name
        times
        setTimes
        weight
        restTime
      }
    }
  }
`;

interface useSeeRecordQuery {
  seeRecords: {
    items: {
      id: number;
      name: string;
      times: number;
      setTimes: number;
      weight: number;
      restTime: number;
    }[];
  }[];
}

function useRecordItems() {
  const { data } = useQuery<useSeeRecordQuery>(SEERECORD_QUERY);
  return { data };
}

export default useRecordItems;
