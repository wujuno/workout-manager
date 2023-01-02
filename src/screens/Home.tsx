import { ApolloClient } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loggedInVar } from "../apollo";
import SLayout from "../components/Layout";


const Banner = styled.div`
    width:1020px;
    height: 300px;
    border: 2px solid tomato;
`;


function Home (){
    return (
        <SLayout>
            <Helmet>
                <title>Home | WM</title>
            </Helmet>
            <Banner>
                {loggedInVar() 
                ? <div>
                    <p>안녕하세요 </p>
                    <p>오늘 컨디션은 어떤가요?</p>
                </div> 
                : <span>안녕하세요</span>}
            </Banner>
        </SLayout>
    )
}

export default Home;