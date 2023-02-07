import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 15px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  children: React.ReactNode;
};

function SLayout({ children }: Props) {
  return (
    <Container>
      <Header />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default SLayout;
