import styled from "styled-components";

const SubmitBtn = styled.input`
    border: none;
    border-radius: 3px;
    margin-top: 13px;
    background-color: ${(props) => props.theme.accentColor};
    color: white;
    text-align: center;
    padding: 11px 0px;
    font-weight: 600;
    width: 100%;
    opacity: ${props=>props.disabled ? "0.4" : "1"};
    cursor:pointer;
`;

export default SubmitBtn;