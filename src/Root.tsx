import { useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar } from "./apollo";
import Footer from "./components/Footer";
import Header from "./components/Header"
import { darkTheme, GlobalStyles, lightTheme } from "./styles";





function Root() {
	const darkMode = useReactiveVar(darkModeVar);
  return (
	<>
		<HelmetProvider>
		<ThemeProvider theme={darkMode ?darkTheme :lightTheme}>
		<GlobalStyles/>
		<Header/>
		<Outlet/>
		<Footer/>
		</ThemeProvider>
		</HelmetProvider>
	</>
  );
}

export default Root;
