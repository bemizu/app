import { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useRouter } from 'next/router'


import VerticalAlign from "../components/verticalAlign";
import Section from "../components/section";
import Image from "next/image";


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
import Session from "../contexts/session";

import theme from "../public/theme";
import { useAuth0 } from '@auth0/auth0-react';


export default function Login() {
  const router = useRouter()
  const session = Session( state => state);

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  useEffect( () => {
  })
  // redirect if user signed in
  if ( isAuthenticated ) {
    router.push("/account")
  }

  return (
    <Layout title="Login">
      <Section>
        <Container>
          <Box bg="white" rounded="lg" shadow="lg" p={[3, 6]}>
            <Button onClick={ loginWithRedirect }>
              Login
            </Button>
          
          
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}
