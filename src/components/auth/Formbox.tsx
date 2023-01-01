import styled from "styled-components";

const Wrapper = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items: center;
flex-direction: column;
margin-bottom: 10px;
form {
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin-top:35px;
}
`;
type Props = {
    children: React.ReactNode;
};

function FormBox ({ children }:Props) {
    return (
        <Wrapper>{children}</Wrapper>
    )
}
export default FormBox;