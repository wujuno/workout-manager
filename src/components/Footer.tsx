import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    justify-content: center;
    align-itmes: center;
    width:100%;
    border: 3px solid red;
    position:absolute;
    bottom: 0px;

`;

function Footer () {
    return (
        <Wrapper>&rarr;</Wrapper>
    )
}

export default Footer;