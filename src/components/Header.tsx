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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 25px 30px;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

//identification
const Validation = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 100px);
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
          <MenuBox>
            <Stack direction="row" spacing={6}>
              {isLoggedIn ? (
                <>
                  <Link to="/record">
                    <Typography gutterBottom color="white">
                      Record
                    </Typography>
                  </Link>
                  <Link to={`/watch/${data?.me?.username}`}>
                    <Typography gutterBottom color="white">
                      Watch
                    </Typography>
                  </Link>
                </>
              ) : null}
            </Stack>
            <Stack direction="row" spacing={4}>
              {isLoggedIn ? (
                <Link to="/">
                  <Button variant="contained" onClick={logOutHanddler}>
                    Log out
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Typography gutterBottom color="white">
                      Log in
                    </Typography>
                  </Link>
                  <Link to="/signup">
                    <Typography gutterBottom color="white">
                      Sign up
                    </Typography>
                  </Link>
                </>
              )}
            </Stack>
          </MenuBox>
        </Wrapper>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
