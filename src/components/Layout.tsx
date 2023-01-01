import styled from "styled-components";

const Container = styled.div`
    width:100%;
    display: flex;
    justify-content:center;
    position: absolute;
    top:0px;
    z-index:-1
`; 
const Wrapper = styled.div`
    margin-top:200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width:350px;
    width:100%;
`

type Props = {
    children: React.ReactNode;
};

function SLayout ({children}:Props){
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    )
}

export default SLayout;