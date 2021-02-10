import Layout from "../layout";
import Container from "../container";
import Section from "../section";
import VerticalAlign from "../verticalAlign";
import Lorem from "../lorem";
import Image from "next/image";
import Link from "next/link";


import {
    Box,
    Heading,
    Button,
    ButtonGroup,
    SimpleGrid,
} from "@chakra-ui/react";
  

function LoggedOut ({ session }) {
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
                          {/* Bemizu is a two-sided marketplace focusing on... */}
                          <Box mb={2}>
                          <Lorem />
                          </Box>
  
                          <Lorem />
                        </Box>
  
                        <ButtonGroup>
                          <Button rounded="full" colorScheme="blue">
                            Read more
                          </Button>
  
                          <Link href="/login#signup">
                          <Button colorScheme="pink" rounded="full">
                            Sign Up
                          </Button>
                          </Link>
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
  
          <Container maxWidth="1200px">
            <SimpleGrid columns={[1, 1, 3]} spacing={[4, 8, 12]}>
              <Box rounded="lg" bg="white" p={5}>
                <Heading size="sm" mb={2}>
                  Heading here
                </Heading>
  
                <Box>
                <Lorem />
                </Box>
                
              </Box>
  
              <Box rounded="lg" bg="white" p={5}>
              <Heading size="sm" mb={2}>
                  Heading here
                </Heading>
  
                <Box>
                <Lorem />
                </Box>
              </Box>
  
              <Box rounded="lg" bg="white" p={5}>
              <Heading size="sm" mb={2}>
                  Heading here
                </Heading>
  
                <Box>
                  <Lorem />
                </Box>
              </Box>
            </SimpleGrid>
  
          </Container>
  
        </Section>
      </Layout>
    )
}

export default LoggedOut;