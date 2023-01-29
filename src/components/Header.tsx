import { useReactiveVar } from "@apollo/client/react";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,} from "react-router-dom";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode, loggedInVar, logUserOut } from "../apollo";
import useUser from "../hooks/useUser";
import Button from "@mui/material/Button"


const Wrapper = styled.nav`
    display:grid;
    grid-template-columns: repeat(4,1fr);
    padding:25px 30px;
    box-shadow: ${props => props.theme.headerShadow};
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
    grid-column-gap:1rem;
    text-align:center;
    a {
        padding:10px;
       &:hover {
        border-radius:20px;
        border: 2px solid ${(props) => props.theme.accentColor};
    }
    }
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
    cursor: pointer;
`;


function Header () {
    const {data} = useUser();
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
               {isLoggedIn
                ? <Item>
                <Link to="record"><span>Record</span></Link>
                <Link to={`/watch/${data?.me?.username}`}><span>Watch</span></Link>
                </Item>
                : null
               } 
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
                <Button variant="contained">Sign up</Button>
                </Link>
                </> 
                }  
            </Validation>
        </Wrapper>
    )
}

export default Header; 