import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import Container from "../components/container";
import Section from "../components/section";
import Lorem from "../components/lorem";
import Image from "next/image";
import Link from "next/link";

import Logged from "../components/Home/Logged";
import LoggedOut from "../components/Home/LoggedOut";

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import theme from "../public/theme";

function Home ({ session, user, loading }) {
  if (loading) {
    return <Layout>
      <Box textAlign="center" py="25vh">
        <Spinner />
      </Box>
    </Layout>
  } else  if ( session.user ) {
    return (
     <Logged session={ session }/>
    )
  } else {
    return (
      <LoggedOut /> 
    )
  }
}

export default Home;
