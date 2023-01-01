import styled from "styled-components";

const SInput = styled.input`
width: 100%;
border-radius: 3px;
padding: 7px;
background-color: #fafafa;
border: 0.5px solid ${(props) => props.theme.borderColor};
margin-top: 5px;
box-sizing: border-box;
&::placeholder {
    font-size: 14px;
}
`;

type InputProps = {
    type:string;
    placeholder:string;
}

function Input(props:InputProps) {
    return <SInput {...props} />;
  }
  export default Input;