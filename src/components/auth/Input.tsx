import styled from "styled-components";

const Input = styled.input`
width: 100%;
border-radius: 3px;
padding: 7px;
background-color: ${(props) => props.theme.bgColor};
border: 0.5px solid ${(props) => props.theme.borderColor};
margin-top: 5px;
box-sizing: border-box;
&::placeholder {
    font-size: 14px;
}
`;


  export default Input;