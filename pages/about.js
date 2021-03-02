import Layout from "../components/layout";
import Section from "../components/section";
import Lorem from "../components/lorem";
import Image from "next/image";
import { Heading, Container, Box, Button, Grid } from "@chakra-ui/react";

import theme from "../public/theme";

import { useAuth0 } from "@auth0/auth0-react";

function About() {
  let members = [
    {
      name: "Bastian Le",
      image: "/drop.png",
    },

    {
      name: "Sam Ullman",
      image: "/drop.png",
    },

    {
      name: "Kan Sovannaroth",
      image: "/drop.png",
    },

    {
      name: "Yohannes Demissie",
      image: "/drop.png",
    },

    {
      name: "Louis Steimel",
      image: "/drop.png",
    },

    {
      name: "Drew Chauvin",
      image: "/drop.png",
    },
  ];

  return (
    <Layout title="About | Bemizu">
      <Section>
        <Container
          maxWidth={theme.width}
          bg={ theme.white }
          rounded="md"
          py={5}
          mb={10}
        >
          <Heading mb={5}>About</Heading>

          <Box mb={4}></Box>

          <Box mb={4}>
            <Lorem />
          </Box>

          <Box>
            <Lorem />
          </Box>
        </Container>

        <Container maxWidth={theme.width} bg={ theme.white } rounded="md" py={5}>
          <Heading mb={8}>Team</Heading>

          {members.map((el) => {
            return (
              <Grid
                templateColumns={["1fr", "140px 3fr", "140px 5fr"]}
                mb={8}
                gap="24px"
                key={ "about-members-" + el.name }
              >
                <Box textAlign="center">
                  <Image src={ el.image } alt={ el.name } height={100} width={ 100 } />
                </Box>

                <Box>
                  <Heading size="md" mb={2}>{ el.name }</Heading>

                  <Lorem />
                </Box>
              </Grid>
            );
          })}

          
        </Container>
      </Section>
    </Layout>
  );
}

export default About;
