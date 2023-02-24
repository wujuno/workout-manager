import { useReactiveVar } from "@apollo/client/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loggedInVar, logUserOut } from "../apollo";
import useUser from "../hooks/useUser";
import Button from "@mui/material/Button";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Wrapper = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 25px 30px;
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
          <Stack direction="row" spacing={6}>
            {isLoggedIn ? (
              <>
                <Link to="/record">
                  <Typography gutterBottom variant="h6" color="white">
                    Record
                  </Typography>
                </Link>
                <Link to={`/watch/${data?.me?.username}`}>
                  <Typography gutterBottom variant="h6" color="white">
                    Watch
                  </Typography>
                </Link>
              </>
            ) : null}
          </Stack>
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
                  <Typography gutterBottom variant="h6" color="white">
                    Log in
                  </Typography>
                </Link>
                <Link to="/signup">
                  <Typography gutterBottom variant="h6" color="white">
                    Sign up
                  </Typography>
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
