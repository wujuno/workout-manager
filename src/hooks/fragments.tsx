import { gql } from "@apollo/client";


export const ITEM_FRAGMENT = gql`
    fragment ItemFragment on Item {
        name
    } 
`;