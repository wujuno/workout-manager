import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { loggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            email
            username
            records{
                date
                items {
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
            date: string
            items: {
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