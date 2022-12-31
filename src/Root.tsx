import { useReactiveVar } from "@apollo/client";
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
		<ThemeProvider theme={darkMode ?darkTheme :lightTheme}>
		<GlobalStyles/>
		<Header/>
		<Outlet/>
		<Footer/>
		</ThemeProvider>
	</>
  );
}

export default Root;
