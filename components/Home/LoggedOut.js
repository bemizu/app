import Layout from "../layout";
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
    Container, 
} from "@chakra-ui/react";
  

function LoggedOut ({ session }) {
    return (
        <Layout title="Home">
  
  
        <Box position="relative" height="100vh" bg="gray.500" >
       
  
  
  
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