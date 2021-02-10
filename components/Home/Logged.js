import Layout from "../layout";
import Container from "../container";
import Section from "../section";

import {
    Box,
    Heading,
} from "@chakra-ui/react";
  

function Logged ({ session }) {
    return (
        <Layout title={ session.user.username }>
        <Section>
          <Container maxWidth="1200px">
            <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Welcome
              </Heading>
            </Box>
          </Container>
        </Section>

      </Layout>
    )
}

export default Logged;