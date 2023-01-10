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
const SEELEGS_QUERY = gql`
    query seeLegs{
        seeLegs {
            name
            id
        }
    }
`;
const SEESHOULDERS_QUERY = gql`
    query seeShoulders{
        seeShoulders {
            name
            id
        }
    }
`;
const SEEABS_QUERY = gql`
    query seeAbs{
        seeAbs {
            name
            id
        }
    }
`;


interface IWorkOutQuery {
    [id:string]: {
        name: string
        id: number
    }[]
}

export function usePush() {
    const {data} = useQuery<IWorkOutQuery>(SEEPUSH_QUERY)
    return {data}
}
export function usePull() {
    const {data} = useQuery<IWorkOutQuery>(SEEPULL_QUERY)
    return {data}
}
export function useLegs() {
    const {data} = useQuery<IWorkOutQuery>(SEELEGS_QUERY)
    return {data}
}
export function useShoulders() {
    const {data} = useQuery<IWorkOutQuery>(SEESHOULDERS_QUERY)
    return {data}
}
export function useAbs() {
    const {data} = useQuery<IWorkOutQuery>(SEEABS_QUERY)
    return {data}
}

