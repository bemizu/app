import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import userbase from 'userbase-js';
import { useState, useEffect  } from "react";

function App ({ Component, pageProps, USERBASE_APP_ID }) {
  const [user, setUser] = useState();


  useEffect(() => {
    userbase.init({ appId: `${USERBASE_APP_ID}` })
  }, []);

  return <ChakraProvider>
    <Component {...pageProps} user={user} setUser={ setUser } />
  </ChakraProvider>

}

export default App


export async function getStaticProps(context) {
  let USERBASE_APP_ID = process.env.USERBASE_APP_ID;

  return {
    props: {
      USERBASE_APP_ID,
    }, // will be passed to the page component as props
  }
}