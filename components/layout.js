import Head from 'next/head'
import { Box } from "@chakra-ui/react";
import Header from "../components/header"

const Layout = ( props ) => (
    <div >
    <Head>
      <title>{ props.title }</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      <Box minHeight="100vh">

        { props.children }
        </Box>
    </main>

    <footer>
    </footer>
  </div>
)

export default Layout;