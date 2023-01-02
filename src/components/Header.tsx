import { useReactiveVar } from "@apollo/client/react";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link,} from "react-router-dom";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode, loggedInVar, logUserOut } from "../apollo";

const Wrapper = styled.nav`
    display:grid;
    grid-template-columns: repeat(4,1fr);
    padding:25px 30px;
    box-shadow: ${props => props.theme.headerShadow}
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
    color: white;
    padding: 10px;
    font-weight: 600;
    border-radius: 4px;
`;
const LoginIn = styled.div`
    padding: 10px;
`;
const DarkModeToggle = styled.div`
    padding: 10px;
    border: 0.4px solid ${props=> props.theme.borderColor};
    border-radius:20px;
    width: 80px;
    display:flex;
    align-items:center;
    justify-content:center;
`;


function Header () {
    const isLoggedIn = useReactiveVar(loggedInVar);
    const isDark = useReactiveVar(darkModeVar);
    const logOutHanddler =()=>{
        logUserOut();
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
                <DarkModeToggle onClick={isDark ? disableDarkMode : enableDarkMode} >
                    <FontAwesomeIcon  
                        icon={isDark ? faSun : faMoon} 
                        size="1x"
                     />
                </DarkModeToggle>    
                {isLoggedIn 
                ? <Link to="/">
                    <SignUp onClick={logOutHanddler}>Log out</SignUp>
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