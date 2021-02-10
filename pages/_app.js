import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import userbase from 'userbase-js';
import { useState, useEffect  } from "react";

import Session from "../contexts/session";

function App ({ Component, pageProps  }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState( true );
  const [session, setMySession] = useState({});
  const setSession = Session( state => state.setSession );
  

  useEffect( () => {
    userbase.init({ appId: `9647171f-9f97-44c6-9fa6-2cc9c3217152` }).then( (data) => {
      setSession( data );
      setMySession( data );
      setLoading( false );
      console.log( data );
    });
    
  }, []);

  return <ChakraProvider>
    <Component {...pageProps} user={user} setUser={ setUser } session={ session } loading={ loading } />
  </ChakraProvider>

}

export default App

