import Head from 'next/head'
import { Box } from "@chakra-ui/react";
import Header from "./header"
import Footer from './footer';
import theme from "../public/theme";

const Layout = ( props ) => (
    <div >
    <Head>
      <title>{ props.title }</title>
      <link rel="icon" href="/bemizu.ico" />
    </Head>

    <Header />

    <main>
      <Box pt={["60px", "60px", "70px"]} bg={ theme.darkBlue } >

        { props.children }

        </Box>
    </main>

    <Footer />
  </div>
)

export default Layout;