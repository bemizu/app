import Layout from "../layout";
import { useState } from "react";
import Section from "../section";
import styled from "@emotion/styled";
import VerticalAlign from "../verticalAlign";
import Lorem from "../lorem";
import Image from "next/image";
import Link from "next/link";
import jump from "jump.js";
import theme from "../../public/theme";
import { PageHeader, BodyText } from "../typography";
import EmailCapture from "../emailCapture";

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
            <Container
              position="relative"
              px={10}
              maxWidth={theme.width}
              mb={["90px", "90px", "150px", "180px"]}
            >
              <Box position="relative" zIndex="2">

              <Box color={theme.white} textAlign="center" mb={[5, 5, 10]} display={["none", "none", "block"]}>
                  <PageHeader textAlign="center">Bemizu. Be You. </PageHeader>
                </Box>

                <Box color={theme.white} textAlign="center" mb={[5, 5, 10]} display={["block", "block", "none"]}>
                  <PageHeader textAlign="center">Bemizu. </PageHeader>
                  <PageHeader textAlign="center">Be You. </PageHeader>
                </Box>

                <Box
                  textAlign="center"
                  color={theme.white}
                  maxWidth="600px"
                  margin="0px auto"
                  mb={[5, 5, 10]}
                  fontSize={[16, 18, 20]}
                >
                  Bemizu is where you organize your personal and professional
                  life; where you make time for your life and your work.
                </Box>

                <Box
                  textAlign="center"
                  color={theme.white}
                  maxWidth="460px"
                  margin="0px auto"
                  mb={[10]}
                  fontSize={[16, 18, 20]}
                >
                  We are working diligently to cultivate an environment where
                  you can Be You! Stay tuned for new developments.
                </Box>

                <Box maxWidth={["100%", "370px", "370px"]} margin="0px auto">
                  <Box color={theme.white} mb={1} fontSize={[16]}>
                    Sign up for upcoming launch
                  </Box>

                  <EmailCapture />
                </Box>
              </Box>

              <Box
                position="absolute"
                right={["2%", "5%", "8%", "10%", "10%"]}
                height={["200px", "380px", "400px", "440px", "480px"]}
                width={["200px", "380px", "400px", "440px", "480px"]}
                bottom="-150px"
                zIndex="0"
              >
                <Image src="/idea.svg" layout="fill" />
              </Box>

              <Box
                position="absolute"
                bg="#2A82C8"
                rounded="full"
                display={["none", "none", "none", "block"]}
                width="140px"
                height="140px"
                bottom="20%"
                opacity="0.94"
              ></Box>

              <Box
                position="absolute"
                rounded="full"
                bg="#568CED"
                display={["none", "none", "none", "block"]}
                width="80px"
                height="80px"
                bottom="8%"
                left="16%"
                zIndex="100"
                opacity="0.94"
              ></Box>
            </Container>
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

        <Box id="next" bg={theme.white} pb={20} pt={[5, 5, 10]}>
          <Container position="relative" px={10} maxWidth={theme.width}>
            <Heading mb={[10, 10]} textAlign={["center", "center", "left"]}>
              I have work to offer
            </Heading>

            <SimpleGrid
              columns={[1, 1, 3]}
              spacing={[8, 10, "50px"]}
              textAlign={[ "left"]}
            >
              <Box>
                <SimpleGrid columns={[2, 2, 1]} spacing={[4, 4, 0]}>
                <Box height={["auto", "auto", "300px"]} position="relative" mb={[2, 2, 5]}>
                  <Image src="/be-your-best.svg" layout="fill" />
                </Box>

                <Box>
                <Heading fontSize={[20, 20, 26]} mb={2}>Be your best</Heading>

                <Box>
                  Offer your talents and look for opportunities set around your
                  schedule
                </Box>
                </Box>
                </SimpleGrid>
              </Box>

              <Box>
              <SimpleGrid columns={[2, 2, 1]} spacing={[4, 4, 0]}>
                <Box height={["auto", "auto", "300px"]} position="relative" mb={[2, 2, 5]}>
                <Image src="/personal.svg" layout="fill" />
                </Box>

                <Box>
                <Heading mb={2} fontSize={[20, 20, 26]}>Personal</Heading>

                <Box>
                  Keep track of all of your jobs and personal events in one
                  versatile calendar
                </Box>
                </Box>
                </SimpleGrid>

              
               
              </Box>

              <Box>

              <SimpleGrid columns={[2, 2, 1]} spacing={[4, 4, 0]}>
                <Box height={["auto", "auto", "300px"]} position="relative" mb={[2, 2, 5]}>
                <Image src="/synced-up.svg" layout="fill" />
                </Box>

                <Box>
                <Heading mb={2} fontSize={[20, 20, 26]}>Synced up</Heading>

                <Box>
                  Get synced up with your team to provide the best value (inside
                  or outside of work)
                </Box>
                </Box>
                </SimpleGrid>

               
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <Box bg={theme.white} position="relative" overflow="hidden" px={5}>
          <Box
            position="absolute"
            height={[800, 900, 900, 900, 1000]}
            top="100px"
            width="100%"
            left="0"
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

          <Container
            bg="white"
            maxWidth={theme.width}
            px={[10, 10, 20]}
            py={[10, 10]}
            position="relative"
            zIndex="4"
            mb={20}
          >
            <Heading mb={[5, 5, 10]} textAlign={["center", "center", "left"]}>
              I have work to be done
            </Heading>

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

          <Container
            bg={theme.blue}
            maxWidth={theme.width - 100}
            px={[10, 10, 20]}
            py={[10, 10, 20]}
            position="relative"
            zIndex="5"
            mb={[20, 20, 20]}
          >
            <Box
              maxWidth="800px"
              margin="0 auto"
              textAlign="center"
              color={theme.white}
              mb={[10, 10, 20]}
            >
              <PageHeader>Sign up for our upcoming launch!</PageHeader>
            </Box>

            <Box maxWidth={["100%", "370px", "370px"]} margin="0 auto">
              <EmailCapture />
            </Box>

            <Box
              position="absolute"
              bg="#2A82C8"
              rounded="full"
              display={["none", "none", "none", "block"]}
              width="140px"
              height="140px"
              left="2%"
              top="20%"
              opacity="0.94"
            ></Box>

            <Box
              position="absolute"
              rounded="full"
              bg="#568CED"
              display={["none", "none", "none", "block"]}
              width="80px"
              height="80px"
              bottom="10%"
              right="12%"
              zIndex="100"
              opacity="0.94"
            ></Box>
          </Container>
        </Box>
      </Styles>
    </Layout>
  );
}

export default LoggedOut;
