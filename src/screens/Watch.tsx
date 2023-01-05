import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import SLayout from "../components/Layout";
import { BaseBox } from "../components/shared";

const Banner = styled(BaseBox)`
    width:1020px;
    height: 300px;
`;

function Watch (){
    return (
        <SLayout>
            <Helmet>
                <title>Watch | WM</title>
            </Helmet>
            <Banner>
            <span>Watch</span>
            </Banner>
        </SLayout>
    )
}

export default Watch;