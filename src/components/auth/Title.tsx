import styled from "styled-components";

const Title = styled.div`
    font-size:40px;
    font-weight:700;
    display:flex;
    justify-content: center;
    font-size: 25px;
`;

type Props = {
    title: string;
}

function STitle ({title}:Props) {
    return (
        <Title>
            <span>{title}</span>
        </Title>
    )
}

export default STitle;