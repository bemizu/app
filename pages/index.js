import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import Container from "../components/container";
import Section from "../components/section";
import Image from "next/image"


import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";





import theme from "../public/theme";


export default function Home({ session, user }) {
  console.log( session )
  return (

    <Layout title="Home">


      <Box position="relative" height={["calc(100vh - 60px)", "calc(100vh - 60px)", "calc(100vh - 70px)"]} >
        <Image
          src="/index.jpg"
          layout="fill"
          objectFit="cover"
          alt="Home"
        />


        <Box position="absolute" width="100vw" height="100%">
          <VerticalAlign>

            <Container>
              <SimpleGrid columns={[1, 1, 2]} spacing={10}>

                <Box>
                  <Heading color="white" fontSize={[55, 75, 100, 110, ]} >
                    21ST CENTURY STAFFING
                  </Heading>

                </Box>


                <Box>
                  <VerticalAlign>

                    <Box rounded="lg" shadow="lg" p={5} bg="#ffffffcc">
                      <Box mb={5}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Box>

                      <ButtonGroup>
                        <Button rounded="full" colorScheme="blue">
                          Find out more
                        </Button>

                        <Button colorScheme="pink" rounded="full">
                          Sign Up
                        </Button>
                      </ButtonGroup>


                    </Box>
                  </VerticalAlign>


                </Box>

              </SimpleGrid>
            </Container>
          </VerticalAlign>




        </Box>

      </Box>

      <Section>

      </Section>
        

    </Layout>
  )
}
