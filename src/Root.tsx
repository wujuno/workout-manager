import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { client } from "./apollo";
import { GlobalStyles } from "./styles";

function Root() {
  return (
    <>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <GlobalStyles />
          <Outlet />
        </HelmetProvider>
      </ApolloProvider>
    </>
  );
}

export default Root;
