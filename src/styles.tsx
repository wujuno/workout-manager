import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
	fontColor: "#2c2c2c",
	bgColor: "white",
	accentColor:"black",
  };
  
export const darkTheme = {
	fontColor: "white",
	bgColor: "#2c2c2c",
	accentColor:"white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        font-family: 'Source Sans Pro', sans-serif;
        color: ${(props) => props.theme.fontColor};
        background-color: ${(props)=> props.theme.bgColor};
    }
    a {
        text-decoration: none;
        color: inherit;
      }
`;
