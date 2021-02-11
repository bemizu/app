import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import Section from "../components/section";
import Lorem from "../components/lorem";
import Image from "next/image";
import Link from "next/link";

import Loading from "../components/Home/Loading";
import Logged from "../components/Home/Logged";
import LoggedOut from "../components/Home/LoggedOut";

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Spinner,
  Container, 
} from "@chakra-ui/react";

import theme from "../public/theme";
import Session from "../contexts/session";


function Home ({ loading }) {
  const session = Session( state => state);

  if (loading) {
    return <Loading />
  } else if ( session.user ) {
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
