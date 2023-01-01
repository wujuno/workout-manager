import styled from "styled-components";
import SLayout from "../components/Layout";

const Banner = styled.div`
    margin-top:100px;
    width:1020px;
    height: 300px;
    border: 2px solid tomato;
`;

function Watch (){
    return (
        <SLayout>
            <Banner>
            <span>Watch</span>
            </Banner>
        </SLayout>
    )
}

export default Watch;