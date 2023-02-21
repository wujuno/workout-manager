import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        font-family: 'Source Sans Pro', sans-serif;
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
