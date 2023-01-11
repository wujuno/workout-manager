import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { loggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            email
            username
            records{
                id
                date
                items {
                    id
                    name
                }
            }
        }
    }
`;

interface UseUserQuery {
    me: {
        email: string
        username: string
        records?: {
            id: number
            date: string
            items: {
                id: number
                name: string
            }[]
        }[]
    }
}

function useUser () {
    const hasToken = useReactiveVar(loggedInVar);
    const {data} = useQuery<UseUserQuery>(ME_QUERY, {
        skip: !hasToken,
    });
    useEffect (()=>{
        if(data?.me === null){
            logUserOut();
        }
    },[data]);
    return {data};
}

export default useUser;