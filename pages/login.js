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
import Session from "../contexts/session";

import theme from "../public/theme";

export default function Login() {
  const router = useRouter()
  const session = Session( state => state);

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
      session.setUser( user )
      router.push("/")
    }).catch((e) => console.error(e))
  }

  function signUpUser ( e ) {
    e.preventDefault();
    
    userbase.signUp({
      username: signUpUsername,
      email: signUpEmail,
      password: signUpPassword
    }).then((user) => {
      session.setUser( user )
      router.push("/")
    }).catch((e) => console.error(e))
  }


  // redirect if user signed in
  if ( session.user ) {
    router.push("/")
  }

  return (
    <Layout title="Login">
      <Section>
        <Container>
          <Box bg="white" rounded="lg" shadow="lg" p={[3, 6]}>
            <Tabs isFitted variant="soft-rounded" colorScheme="gray">
              <TabList >
                <Tab  fontSize="lg" rounded="full" mr={2}>
                 
                    Login
                    
                </Tab>
                <Tab fontSize="lg" rounded="full" ml={2} >
                  Sign Up
                </Tab>
              </TabList>

              <TabPanels>
              <TabPanel p={0} pt={4} outline="none">

                <Heading size="lg" mb={5}>
                  Login
                </Heading>

              <form onSubmit={ loginUser }>
            <FormControl mb={2} isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={ ( e ) => { setLoginUsername( e.currentTarget.value ) } } />
            </FormControl>

            <FormControl mb={2} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={ ( e ) => { setLoginPassword( e.currentTarget.value ) } }  />
            </FormControl>

            <Box mb={3} mt={4}>
              <ButtonGroup>
                <Button rounded="full" size="lg" colorScheme="pink" type="submit">Login</Button>
              </ButtonGroup>
            </Box>

            <Box mb={1}>
              <Checkbox>Remember me</Checkbox>
            </Box>

            <Box>
              <ChakraLink fontSize="sm" color="blue.500">
                Forgot password?
              </ChakraLink>
            </Box>

            </form>
                
              </TabPanel>
              <TabPanel p={0} pt={4} outline="none">

                <Heading size="lg" mb={5}>
                  Sign Up
                </Heading>

                <form onSubmit={ signUpUser }>
                <FormControl mb={2} isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={ ( e ) => { setSignUpUsername( e.currentTarget.value ) } }  />
            </FormControl>

            <FormControl mb={2} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" onChange={ ( e ) => { setSignUpEmail( e.currentTarget.value ) } }  />
            </FormControl>

            <FormControl mb={2} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={ ( e ) => { setSignUpPassword( e.currentTarget.value ) } }  />
            </FormControl>

            <Box mb={3} mt={4}>
              <ButtonGroup>
                <Button rounded="full" size="lg" colorScheme="yellow" type="submit">Sign Up</Button>
              </ButtonGroup>
            </Box>

            </form>
                
              </TabPanel>
            </TabPanels>

            </Tabs>

          
          
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}
