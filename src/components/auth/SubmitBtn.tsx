import styled from "styled-components";

const Btn = styled.input`
border: none;
border-radius: 3px;
margin-top: 13px;
background-color: ${(props) => props.theme.accentColor};
color: white;
text-align: center;
padding: 11px 0px;
font-weight: 600;
width: 100%;
`;

type ButtonProps = {
    type:string;
    value:string;
}

function SubmitBtn(props:ButtonProps) {
    return <Btn {...props} />;
  }
  export default SubmitBtn;