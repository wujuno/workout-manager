import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token"
const DARK_MODE = "DARK_MODE";

export const loggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token:string) => {
    localStorage.setItem(TOKEN,token);
    loggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN)
    window.location.reload();
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});