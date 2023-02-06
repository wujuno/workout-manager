import { useReactiveVar } from "@apollo/client/react";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  darkModeVar,
  disableDarkMode,
  enableDarkMode,
  loggedInVar,
  logUserOut,
} from "../apollo";
import useUser from "../hooks/useUser";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Wrapper = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 25px 30px;
  box-shadow: ${(props) => props.theme.headerShadow};
`;
//logo

//items
const Items = styled.ul`
  grid-column: 2 / span 2;
`;
const Item = styled.li`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 1rem;
`;
//identification
const Validation = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 1rem;
  text-align: center;
`;

const DarkModeToggle = styled.div`
  padding: 10px;
  border: 0.4px solid ${(props) => props.theme.borderColor};
  border-radius: 20px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function Header() {
  const { data } = useUser();
  const isLoggedIn = useReactiveVar(loggedInVar);
  const isDark = useReactiveVar(darkModeVar);
  const logOutHanddler = () => {
    logUserOut();
  };
  return (
    <Wrapper>
      <Link to="/">
        <Typography variant="h5">Workout Manager</Typography>
      </Link>
      <Items>
        {isLoggedIn ? (
          <Item>
            <Link to="record">
              <Button variant="text">Record</Button>
            </Link>
            <Link to={`/watch/${data?.me?.username}`}>
              <Button variant="text">Watch</Button>
            </Link>
          </Item>
        ) : null}
      </Items>
      <Validation>
        <DarkModeToggle onClick={isDark ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} size="1x" />
        </DarkModeToggle>
        {isLoggedIn ? (
          <Link to="/">
            <Button variant="contained" onClick={logOutHanddler}>
              Log out
            </Button>
          </Link>
        ) : (
          <>
            <Link to="login">
              <Button variant="outlined">Log in</Button>
            </Link>
            <Link to="signup">
              <Button variant="contained">Sign up</Button>
            </Link>
          </>
        )}
      </Validation>
    </Wrapper>
  );
}

export default Header;
