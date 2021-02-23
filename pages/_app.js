import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Session from "../contexts/session";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const session = Session( state => state);
  const { user } = useAuth0();

  useEffect(() => {
    setLoading(false);

    debugger
    if (user) {
      session.setUser(user);
    }
  }, [ user ]);

  return (
    <Auth0Provider
      domain={`${process.env.AUTH0_DOMAIN}`}
      clientId={`${process.env.AUTH0_CLIENT_ID}`}
      redirectUri={"http://localhost:3000/"}
    >
      <ChakraProvider>
        <Component {...pageProps} loading={loading} />
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default App;
