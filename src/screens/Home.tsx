import styled from "styled-components";

const Wrapper = styled.div`
    width:100vw;
    height: 100vh;

    display: flex;
    justify-content:center;
    position: absolute;
    top:0px;
    z-index:-1
`; 

const Banner = styled.div`
    margin-top:100px;
    width:1020px;
    height: 300px;
    border: 2px solid tomato;
`;

function Home (){
    return (
        <Wrapper>
            <Banner>
                <div>
                    <p>안녕하세요 User님</p>
                    <p>오늘 컨디션은 어떤가요?</p>
                </div>
            </Banner>
        </Wrapper>
    )
}

export default Home;