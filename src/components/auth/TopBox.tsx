import styled from "styled-components";
import { BaseBox } from "../shared";

const Wrapper = styled(BaseBox)`
  width: 300px;
  padding: 30px 40px;
`;

type Props = {
  children: React.ReactNode;
};

function TopBox({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

export default TopBox;
