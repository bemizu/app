import Head from 'next/head'
import { Box } from "@chakra-ui/react";
import Header from "../components/header"

const Layout = ( props ) => (
    <div >
    <Head>
      <title>{ props.title }</title>
      <link rel="icon" href="/bemizu.ico" />
    </Head>

    <Header />

    <main>
      <Box pt={[0, 0, "80px"]} pb={[70, 70, 0]}>
        { props.children }
        </Box>
    </main>

    <footer>
    </footer>
  </div>
)

export default Layout;