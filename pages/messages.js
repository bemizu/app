import { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useRouter } from 'next/router'

import VerticalAlign from "../components/verticalAlign";
import Section from "../components/section";
import Image from "next/image";

import userbase from "userbase-js";

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Container,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link as ChakraLink,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import theme from "../public/theme";

export default function Login({ session, user, setUser }) {
  const router = useRouter()

  const [ loginUsername, setLoginUsername ] = useState();
  const [ loginPassword, setLoginPassword ] = useState();


  const [ signUpUsername, setSignUpUsername ] = useState();
  const [ signUpEmail, setSignUpEmail ] = useState();
  const [ signUpPassword, setSignUpPassword ] = useState();
  

  function loginUser ( e ) {
    e.preventDefault();
    
    userbase.signIn({
      username: loginUsername,
      password: loginPassword
    }).then((user) => {
      setUser( user )
      window.location.href = "/"
    }).catch((e) => console.error(e))
  }

  function signUpUser ( e ) {
    e.preventDefault();
    
    userbase.signUp({
      username: signUpUsername,
      email: signUpEmail,
      password: signUpPassword
    }).then((user) => {
      setUser( user )
      window.location.href = "/"
    }).catch((e) => console.error(e))
  }


  // redirect if user signed in
  if ( !session.user ) {
    router.push("/")
  }

  return (
    <Layout title="Messages">
      <Section>
        <Container maxWidth="800px">
          <Box bg="white" rounded="lg" shadow="lg" p={[3, 6]}>
            <Heading>
              Messages
            </Heading>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}
