import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import Container from "../components/container";
import Image from "next/image"

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";





import theme from "../public/theme";


export default function Home() {
  return (

    <Layout title="Home">



      <Box position="relative" height={["calc(100vh - 70px)", "calc(100vh - 70px)", "calc(100vh - 80px)"]} >
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
                  <Heading color="white" fontSize="120px">
                    Be water,
        </Heading>

                  <Heading color="white" fontSize="100px">
                    my friends!
        </Heading>
                </Box>


                <Box>
                  <VerticalAlign>

                    <Box rounded="lg" shadow="lg" p={5} bg="#ffffffcc">
                      <Box mb={5}>
                        daskjfnaksdjnfa
                        asdlfknasldkfna
                        sdkfn
                        asdlfknasldkfnaaskdnf
                        asdlfknasldk fnaaslk;dnf
                        asdlfknasld kfnaalsdknf
                        asdlknf
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

    </Layout>
  )
}
