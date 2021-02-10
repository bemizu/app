import Layout from "../layout";
import Container from "../container";
import Section from "../section";

import {
    Box,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
  

function Logged ({ session }) {
    return (
        <Layout title={ session.user.username }>
        <Section>
          <Container maxWidth="1200px">
              <SimpleGrid columns={[1, 2, 3]} spacing={[4, 8, 12]}>
              <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Welcome
              </Heading>
            </Box>

            <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Welcome
              </Heading>
            </Box>

            <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Welcome
              </Heading>
            </Box>
              </SimpleGrid>
            
          </Container>
        </Section>

      </Layout>
    )
}

export default Logged;