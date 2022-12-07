import styled from "styled-components";

const Wrapper = styled.div`
    width:100vw;
    height: 100vh;
    background-color: #d7cc7a;
    display: flex;
    justify-content:center;
    position: absolute;
    top:0px;
    z-index:-1
`; 

const Container = styled.div`
    margin-top:100px;
    width:1020px;
    height: 600px;
    border: 2px solid tomato;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Title = styled.div`
    margin-top:20px;
    font-size:50px;
`;

const Form = styled.form`
    margin-top:20px;
    width:960px;
    height:500px;
    border:1px solid green;
`;

function Record (){
    return (
        <Wrapper>
            <Container>
                <Title>
                    <p>아래에 운동 내용을 기록하세요!</p>
                </Title>
                <Form>
                    <div>
                    <input type="date" />
                    </div>
                    <div>
                        <button>미는 운동</button>
                        <button>당기는 운동</button>
                        <button>하체 운동</button>
                        <button>어깨 운동</button>
                        <button>복근 운동</button>
                    </div>
                </Form>
            </Container>
        </Wrapper>
    )
}

export default Record;