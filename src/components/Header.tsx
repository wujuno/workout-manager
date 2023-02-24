import { useReactiveVar } from "@apollo/client/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loggedInVar, logUserOut } from "../apollo";
import useUser from "../hooks/useUser";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography } from "@mui/material";
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

function Header() {
  const { data } = useUser();
  const isLoggedIn = useReactiveVar(loggedInVar);
  const logOutHanddler = () => {
    logUserOut();
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Wrapper>
          <Link to="/">
            <Typography variant="h5">Workout Manager</Typography>
          </Link>
          <Items>
            {isLoggedIn ? (
              <Item>
                <Link to="/record">
                  <Button variant="text">Record</Button>
                </Link>
                <Link to={`/watch/${data?.me?.username}`}>
                  <Button variant="text">Watch</Button>
                </Link>
              </Item>
            ) : null}
          </Items>
          <Validation>
            {isLoggedIn ? (
              <Link to="/">
                <Button variant="contained" onClick={logOutHanddler}>
                  Log out
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </Validation>
        </Wrapper>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
