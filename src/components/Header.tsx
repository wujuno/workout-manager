import { useReactiveVar } from "@apollo/client/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darkModeVar, loggedInVar } from "../apollo";

const Wrapper = styled.nav`
    display:grid;
    grid-template-columns: repeat(4,1fr);
    padding:25px 30px;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
//logo
const Logo = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:700;
    padding: 5px 0;
`;
//items
const Items = styled.ul`
    grid-column: 2 / span 2;
`;
const Item = styled.li`
    display:grid;
    grid-template-columns: repeat(7,1fr);
    padding: 10px 0
`;
//identification
const Validation = styled.div`
    display:grid;
    grid-template-columns: repeat(3,100px);
    grid-gap: 1rem;
    text-align:center;
`;
const SignUp = styled.div`
    background-color:${(props)=> props.theme.accentColor};
    color:${(props)=> props.theme.bgColor};
    padding: 10px;
`;
const LoginIn = styled.div`
    padding: 10px;
`;



function Header () {
    const [theme, setTheme] = useState(false);
    const isLoggedIn = useReactiveVar(loggedInVar);
    const isDark = useReactiveVar(darkModeVar);
    const themeHanddler = () => {
            setTheme(prev => !prev)
            darkModeVar(theme);
    }
    return (
        <Wrapper>
            <Link to="/">
                <Logo>Workout Manager</Logo>
            </Link>
            <Items>
                <Item>
                <Link to="record"><span>Record</span></Link>
                <Link to="watch"><span>Watch</span></Link>
                </Item>
            </Items>
            <Validation>
                <button onClick={themeHanddler}>{isDark ? "Light Mode" :"Dark Mode"}</button>    
                {isLoggedIn 
                ? <Link to="/">
                    <SignUp onClick={()=>loggedInVar(false)}>Log out</SignUp>
                </Link>
                : <>
                <Link to="login">
                    <LoginIn>Log in</LoginIn>
                </Link> 
                <Link to="signup">
                    <SignUp>Sign up</SignUp>
                </Link>
                </> 
                }  
            </Validation>
        </Wrapper>
    )
}

export default Header; 