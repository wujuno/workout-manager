import { gql, useQuery } from "@apollo/client";

const SEERECORD_QUERY = gql`
    query seeRecord($date:String!) {
        seeRecord(date:$date) {
            id
            date
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
    seeRecord: {
        id: number
        date: string
        items: {
            id: number
            name: string
            times: number
            setTimes: number
            weight: number
            restTime: number
        }[]
    }
}

function useSeeRecord (date:string|undefined) {
    const {data} = useQuery<useSeeRecordQuery>(SEERECORD_QUERY, {
        variables: {
            date
        }
    });
    return {data};
}

export default useSeeRecord;