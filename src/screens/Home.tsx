import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
                <div>
                    <p>안녕하세요 User님</p>
                    <p>오늘 컨디션은 어떤가요?</p>
                </div>
            </Banner>
        </SLayout>
    )
}

export default Home;