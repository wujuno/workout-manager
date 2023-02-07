import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "#FAFAFA",
  authBgColor: "white",
  accentColor: "#3c519f",
  borderColor: "rgb(219, 219, 219)",
  headerShadow: "0 2px 1px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.06)",
};

export const darkTheme = {
  fontColor: "#FAFAFA",
  bgColor: "#2c2c2c",
  authBgColor: "#181818",
  accentColor: "#3c519f",
  borderColor: "rgb(219, 219, 219)",
  headerShadow:
    "0 2px 1px rgba(255, 255, 255, 0.2), 0 10px 20px rgba(255, 255, 255, 0.06)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        font-family: 'Source Sans Pro', sans-serif;
        color: ${(props) => props.theme.fontColor};
        background-color: ${(props) => props.theme.bgColor};
        font-size:18px;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    input {
      all: unset;
    }
    html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
    
`;
