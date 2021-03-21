import Layout from "../layout";
import { useState } from "react";
import styled from "@emotion/styled";
import VerticalAlign from "../verticalAlign";
import Image from "next/image";
import Link from "next/link";
import theme from "../../public/theme";
import { PageHeader, BodyText } from "../typography";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Link as ChakraLink,
  Box,
  Heading,
  Button,
  ButtonGroup,
  SimpleGrid,
  Stack,
  Container,
  Grid,
  Input,
} from "@chakra-ui/react";

const Styles = styled.div`
  .chooser-box {
    height: 0;
    opacity: 0;
    z-index: -1;
    transition: 0.1s ease;
    margin-top: 4px;
    position: absolute;
    width: 100%;

    &.active {
      height: 40px;
      opacity: 1;
      z-index: 7;
    }
  }

  .mobile-button {
    transition: 0.1s ease;
    margin-top: 0px;

    &.active {
      @media screen and (max-width: ${theme.breakpoints[1]}) {
        margin-top: 44px;
      }
    }
  }
`;

function LoggedOut({ session }) {

  let { loginWithRedirect } = useAuth0()

  return (
    <Layout title="Home | Bemizu">
      <Styles>
        <Box
          position="relative"
          minHeight={[600, 700, 700, 700, 700]}
          height="calc(100vh - 70px)"
          className="home-hero"
          overflow="hidden"
          
        >
          <Box
            position="absolute"
            height={[800, 900, 900, 900, 1000]}
            width="100%"
            zIndex="0"
            overflow="hidden"
          >
            <Box overflow="hidden">
              <VerticalAlign>
                <img
                  src="/pattern-vector.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bottom: 50,
                    objectFit: "cover",
                    opacity: 0.6,
                  }}
                />
                {/* <Image src="/pattern-vector.svg" layout="fill" /> */}
              </VerticalAlign>
            </Box>
          </Box>

          <VerticalAlign>
            <Box px={[5, ]}>
            <Container
              position="relative"
              px={10}
              margin="0 auto"
              mx={5}
              width="100%"
              maxWidth={["100%", "100%", 600]}
              bg="#ffffff"
              p={[4, 6]}
              rounded="lg"
              
              mb={["90px", "90px", "150px",]}
            >
              <Box position="relative" zIndex="2">
                  
                  <Heading mb={[2, 2, 4]} textAlign="center">
                    Bemizu. Be You.
                  </Heading>
              


                <Box
                  textAlign="center"
                  margin="0px auto"
                  mb={[3, 3, 5]}
                  fontSize={[16, 18, 20]}
                >
                  Bemizu is where you organize your personal and professional
                  life; where you make time for your life and your work.
                </Box>

                <Box
                  textAlign="center"
                  margin="0px auto"
                  mb={[5, 5, 10]}
                  fontSize={[16, 18, 20]}
                >
                  We are working diligently to cultivate an environment where
                  you can Be You! Stay tuned for new developments.
                </Box>

                <Box textAlign="center" px={[0, 0, 6]} width={["100%", 400, 400]} m="15px auto">
              
              <Button colorScheme="orange" width="100%" rounded="sm" onClick={ loginWithRedirect }>
                  Log in
              </Button>
              

          </Box>
              </Box>

            

            
          
            </Container>
            </Box>
          </VerticalAlign>

          <Box
            position="absolute"
            width="100%"
            bottom={"0px"}
            height={["13.6vw", "13.6vw"]}
            zIndex="1"
          >
            <img
              src="/landing-wave.svg"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                bottom: -1,
                objectFit: "cover",
              }}
            />
            {/* <Image src="/landing-wave.svg" layout="fill"  /> */}
          </Box>
        </Box>

        <Box bg={ theme.white } pb={5}>
        <Container
            
            maxWidth={theme.width}
            px={[10, 10, 20]}
            position="relative"
            zIndex="4"
            mb={20}
          >

            <SimpleGrid
              columns={[1, 1, 2]}
              spacing={[10, 10, 20]}
              textAlign={["center", "center", "left"]}
            >
              <Box>
                <Box
                  height={[250, 300, "400px"]}
                  position="relative"
                  mb={[1, 1, 5]}
                >
                  <Image src="/manage-and-recruit.svg" layout="fill" />
                </Box>

                <Heading mb={2} fontSize={[20, 20, 26]}>Manage and recruit</Heading>

                <Box>
                  Gain full HR support and solutions from hiring to payroll
                </Box>
              </Box>

              <Box>
                <Box
                  height={[250, 300, "400px"]}
                  position="relative"
                  mb={[1, 1, 5]}
                >
                  <Image src="/hr-partnerships.svg" layout="fill" />
                </Box>

                <Heading mb={2} fontSize={[20, 20, 26]}>Gain HR partnerships</Heading>

                <Box>
                  Reach out to your potential team members through our partner
                  network (Indeed, Craigslist, Monster, PoachedJob, and more)
                </Box>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        

      </Styles>
    </Layout>
  );
}

export default LoggedOut;
