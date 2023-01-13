import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const TOKEN = "authorization"
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

const authLink = setContext((_,{headers}) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem(TOKEN),
    }
  }
})

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === "production" 
        ? "https://workout-manager-backend.herokuapp.com/graphql" 
        : "http://localhost:4000/graphql",
})


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});