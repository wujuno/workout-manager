import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar } from "./apollo";
import Footer from "./components/Footer";
import Header from "./components/Header"
import { darkTheme, GlobalStyles, lightTheme } from "./styles";





function Root() {
	const darkMode = useReactiveVar(darkModeVar);
  return (
	<>
		<ApolloProvider client={client}>
		<HelmetProvider>
		<ThemeProvider theme={darkMode ?darkTheme :lightTheme}>
		<GlobalStyles/>
		<Header/>
		<Outlet/>
		<Footer/>
		</ThemeProvider>
		</HelmetProvider>
		</ApolloProvider>
	</>
  );
}

export default Root;
