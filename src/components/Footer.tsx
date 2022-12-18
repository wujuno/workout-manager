import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    display:flex;
    justify-content: center;
    border: 2px solid white;
    position:absolute;
    bottom: 0px;
    right:0;
    left:0;

`;

function Footer () {
    return (
        <Wrapper 
            transition={{type:"keyframes"}}
            initial={{ y: 0 }}
            animate={{ y: -10 }}>
            <span>개발중...🛠</span>
        </Wrapper>
    )
}

export default Footer;