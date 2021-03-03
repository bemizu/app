import Layout from "../layout";
import Section from "../section";
import VerticalAlign from "../verticalAlign";
import Lorem from "../lorem";
import Image from "next/image";
import Link from "next/link";
import jump from "jump.js"
import theme from "../../public/theme";

import {
  Box,
  Heading,
  Button,
  ButtonGroup,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

function LoggedOut({ session }) {
  return (
    <Layout title="Home | Bemizu">
      <Box position="relative" minHeight={[600, 700, 700, 700, 800]} height="calc(100vh - 70px)" className="home-hero">
        <VerticalAlign>
          <Container maxWidth={ theme.width + 20 } px={10}>
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={10} mb={[100, 100, 100, 200]}>
          <Box>
            <Heading color={ theme.white } fontSize={["65px", "75px", "75px", "85px"]} fontWeight={ 400 }>
            What we do
            </Heading>

            <Heading color={ "gray.300" } fontSize={["45px", "50px", "50px", "55px"]} fontWeight={ 800 } mb={4}>
What we are looking
to improve
            </Heading>

            <Box color="white" mb={6}>
            <Lorem />
            </Box>

            <ButtonGroup mb={15}>
              <Button bg={ theme.orange } rounded="sm" color={ theme.white } _hover={{bg: theme.orange + "cc" }}>
              Sign Up
              </Button>

              <Button bg={ "#EDF2F7"} rounded="sm" _hover={{bg: "#EDF2F7cc" }} onClick={ () => { jump("#next") } } >
              Learn More
              </Button>
            </ButtonGroup>
          </Box>

          <Box position="relative" >
            <Image src="/idea.svg" layout="fill" />
          </Box>

        </SimpleGrid>
        </Container>
        </VerticalAlign>

        <Box position="absolute" width="100%" bottom={"0px"} height={["200px", "230px", "300px", "19vw"]} zIndex="1">
          <img src="/landing-wave.svg" style={{width: "100%", height:"100%", position: "absolute",  bottom: -1, objectFit: "cover"}} />
          {/* <Image src="/landing-wave.svg" layout="fill"  /> */}
        </Box>
      </Box>

      <Box id="next">
      <Section bg={ theme.white } >

      </Section>
      </Box>

      <Section>
        <Container maxWidth="1200px">
          <SimpleGrid columns={[1, 1, 3]} spacing={[4, 8, 8, 12]}>
            <Box rounded="lg" bg={theme.white} p={5}>
              <Heading size="lg" mb={2}>
                Heading here
              </Heading>

              <Box>
                <Lorem />
              </Box>
            </Box>

            <Box rounded="lg" bg={theme.white} p={5}>
              <Heading size="lg" mb={2}>
                Heading here
              </Heading>

              <Box>
                <Lorem />
              </Box>
            </Box>

            <Box rounded="lg" bg={theme.white} p={5}>
              <Heading size="lg" mb={2}>
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
  );
}

export default LoggedOut;
