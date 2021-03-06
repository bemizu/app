import Layout from "../layout";
import Section from "../section";
import VerticalAlign from "../verticalAlign";
import Lorem from "../lorem";
import Image from "next/image";
import Link from "next/link";
import jump from "jump.js"
import theme from "../../public/theme";
import { PageHeader, BodyText } from "../typography";

import {
  Box,
  Heading,
  Button,
  ButtonGroup,
  SimpleGrid,
  Container,
  Grid, 
  Input,
} from "@chakra-ui/react";

function LoggedOut({ session }) {
  return (
    <Layout title="Home | Bemizu">
      <Box position="relative" minHeight={[600, 700, 700, 700, 800]} height="calc(100vh - 70px)" className="home-hero" overflow="hidden">
        <Box position="absolute" height={[800, 900, 900, 900, 1000]} width="100%" zIndex="0" overflow="hidden">
          <Box overflow="hidden">
        <VerticalAlign>

          <img src="/pattern-vector.svg" style={{width: "100%", height:"100%", position: "absolute",  bottom: 50, objectFit: "cover", opacity: 0.6}} />
          {/* <Image src="/pattern-vector.svg" layout="fill" /> */}

        </VerticalAlign>
        </Box>
        </Box>

        <VerticalAlign>

        <Container  position="relative" px={ 10 } maxWidth={ theme.width } mb={["100px", "100px", "150px", "180px"]}>

          <Box position="relative" zIndex="2">
          <Box color={ theme.white } textAlign="center" mb={10}>
          <PageHeader textAlign="center" >
            Bemizu. Be You.
            </PageHeader>
          </Box>
        

          <Box textAlign="center" color={ theme.white } maxWidth="800px" margin="0px auto" mb={10}>
            <BodyText >
            Bemizu is where you organize your personal and professional life; where you make time for your life and your work.
            </BodyText>
            </Box>

            <Box textAlign="center" color={ theme.white } maxWidth="600px" margin="0px auto" mb={10}>
            <BodyText >
            We are working diligently to cultivate an environment 
where you can Be You! (v. You Be You)
Stay tuned for new developments.
            </BodyText>
            </Box>

            <Box maxWidth="370px" margin="0px auto" >
              <Box color={ theme.white } mb={1}>
                Sign up for upcoming launch
              </Box>

              <Box>
                <Grid templateColumns={["100% 100%", "calc(80% - 4px) 20%", "calc(80% - 4px) 20%"]} gap={"4px"}>

                  <Box>
                    <Input bg={ theme.white } color={ theme.blue } rounded="sm" />
                  </Box>

                  <Box>
                  <Button bg={ theme.orange } rounded="sm" color={ theme.white } _hover={{bg: theme.orange + "cc" }}>
              Sign Up
              </Button>
                  </Box>

                </Grid>
              </Box>
            </Box>
            </Box>

            <Box position="absolute" right={["2%", "5%", "8%", "10%", "10%"]} height={["200px", "380px", "400px", "440px", "480px"]} width={["200px", "380px", "400px", "440px", "480px"]} bottom="-150px" zIndex="0" >
            <Image src="/idea.svg" layout="fill"  />
          </Box>

          <Box position="absolute" bg="#2A82C8" rounded="full" display={["none", "none", "none", "block" ]} width="140px" height="140px" bottom="20%" opacity="0.94">
          </Box>

          <Box position="absolute" rounded="full" bg="#568CED" display={["none", "none", "none", "block" ]} width="80px" height="80px" bottom="8%" left="16%" zIndex="100" opacity="0.94">
          
          </Box>

            </Container>

            

        </VerticalAlign>

        <Box position="absolute" width="100%" bottom={"0px"} height={["13.4vw", "13.4vw"]} zIndex="1" >
          <img src="/landing-wave.svg" style={{width: "100%", height:"100%", position: "absolute",  bottom: -1, objectFit: "cover"}} />
          {/* <Image src="/landing-wave.svg" layout="fill"  /> */}
        </Box>
      </Box>

      <Box id="next">
        <Section bg={ theme.white }>

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
