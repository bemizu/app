import Layout from "../components/layout";

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

import theme from "../public/theme";

export default function Login({ session, user }) {
  console.log(session);
  return (
    <Layout title="Home">
      <Section>
        <Container>
          <Box bg="white" rounded="lg" shadow="lg" p={[3, 6]}>
            <Tabs isFitted variant="soft-rounded" colorScheme="gray">
              <TabList >
                <Tab  fontSize="lg" rounded="full" mr={2}>
                 
                    Login
                    
                </Tab>
                <Tab fontSize="lg" rounded="full" ml={2}>
                  Sign Up
                </Tab>
              </TabList>

              <TabPanels>
              <TabPanel p={0} pt={4} outline="none">

                <Heading size="lg" mb={5}>
                  Login
                </Heading>

            <FormControl mb={2}>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>

            <Box mb={3} mt={4}>
              <ButtonGroup>
                <Button rounded="full">Login</Button>
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
                
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>

            </Tabs>

          
          
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}
