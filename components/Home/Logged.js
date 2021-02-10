import Layout from "../layout";
import Container from "../container";
import Section from "../section";

import {
    Box,
    ButtonGroup,
    Heading,
    SimpleGrid,
    Button, 
} from "@chakra-ui/react";
  

function Logged ({ session }) {
    return (
        <Layout title={ session.user.username }>
        <Section>
          <Container maxWidth="1200px" >
              <SimpleGrid columns={[1, 2, 3]} spacing={[4, 8, 12]} mb={[4, 8, 12]}>
              <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Profile
              </Heading>

              <ButtonGroup>
                  <Button size="sm" rounded="full" colorScheme="green">
                      View

                  </Button>

                  <Button size="sm" rounded="full" colorScheme="blue">
                      Edit

                  </Button>
              </ButtonGroup>
            </Box>

            <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Welcome
              </Heading>
            </Box>

            <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading>
                Earnings
              </Heading>
            </Box>
              </SimpleGrid>

              <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
                <Heading>
                    Find Jobs
                </Heading>
              </Box>
            
          </Container>
        </Section>

      </Layout>
    )
}

export default Logged;