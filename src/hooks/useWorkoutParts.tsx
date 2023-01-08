import { gql, useQuery } from "@apollo/client";

const SEEPUSH_QUERY = gql`
    query seePush{
        seePush {
            name
            id
        }
    }
`;
const SEEPULL_QUERY = gql`
    query seePull{
        seePull {
            name
            id
        }
    }
`;

interface IPushQuery {
    seePush: {
        name: string
        id: number
    }[]
}
interface IPullQuery {
    seePull: {
        name: string
        id: number
    }[]
}

export function usePush() {
    const {data} = useQuery<IPushQuery>(SEEPUSH_QUERY)
    return {data}
}
export function usePull() {
    const {data} = useQuery<IPullQuery>(SEEPULL_QUERY)
    return {data}
}

