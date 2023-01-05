import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { loggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            email
            username
        }
    }
`;

function useUser () {
    const hasToken = useReactiveVar(loggedInVar);
    const {data} = useQuery(ME_QUERY, {
        skip: !hasToken,
    });
    console.log(data);
    useEffect (()=>{
        if(data?.me === null){
            logUserOut();
        }
    },[data]);
    return {data};
}

export default useUser;