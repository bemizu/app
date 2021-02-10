import Image from "next/image";
import Layout from "../layout";
import Section from "../section";

import {
    Box,
    ButtonGroup,
    Heading,
    SimpleGrid,
    Button, 
    Grid,
    Divider, 
    Container, 
} from "@chakra-ui/react";
import VerticalAlign from "../verticalAlign";
import Link from "next/link";
  

function Logged ({ session }) {

    const jobs = [
        {
            id: "foobar",
            title: "kajdnf",
            image: "image",
            earnings: 109.99,
            nextShift: "asdf"
        },

        {
            id: "foobar4",
            title: "kajdnf",
            image: "image",
            earnings: 109.99,
            nextShift: "asdf"
        },

        {
            id: "foobar2",
            title: "kajdnf",
            image: "image",
            earnings: 109.99,
            nextShift: "asdf"
        },

        {
            id: "foobar1",
            title: "kajdnf",
            image: "image",
            earnings: 109.99,
            nextShift: "asdf"
        },
    ];
    return (
        <Layout title={ session.user.username }>
        <Section>
          <Container maxWidth="1200px" >
              <SimpleGrid columns={[1, 2, 3]} spacing={[4, 8, 12]} mb={[4, 8, 12]}>
              <Box bg="white" p={[3, 6]} rounded="lg" shadow="lg">
              <Heading >
                Profile
              </Heading>

              <ButtonGroup>
                  <Link href={`/profile/${ session.user.username }`}>
                  <Button size="sm" rounded="full" colorScheme="green">
                      View
                  </Button>
                  </Link>

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
                <Heading mb={4}>
                    My Jobs
                </Heading>

                <Divider mb={2} />

                <Box mb={4}>
                    <Grid templateColumns={["100%", "100%", "50px 120px calc(100% - 370px) 80px 80px"]} mb={1} gap={"10px"} >
                        <Box>
                        
                        </Box>

                        <Box>
                            <Heading size="sm">
                                Title
                            </Heading>
                           
                        </Box>

                        <Box>
                            <Heading size="sm">
                                Description
                            </Heading>
                           
                        </Box>

                        <Box>
                            <Heading size="sm">
                                Earnings
                            </Heading>
                           
                        </Box>

                        <Box>
                            <Heading size="sm">
                                Next 
                            </Heading>
                           
                        </Box>
                    </Grid>

                    <Divider mb={2} />
                
                    {
                        jobs.map( (el) => {
                            return (
                                <Box id={ el.id }>
                                    <Grid templateColumns={["100%", "100% ", "50px 120px calc(100% - 370px) 80px 80px"]} mb={1} gap={"10px"}>
                                <Box>
                                    <Box rounded="md" overflow="hidden" position="relative" height="50px" width="50px" mb={1}>
                                    <Image src="/bemizu.jpg" width={50} height={50} alt="Bemizu Logo" />
                                    </Box>
                                </Box>

                                <Box >
                                    <VerticalAlign>
                                    { el.title }
                                    </VerticalAlign>
                                </Box>

                                <Box>
                                    <VerticalAlign>

                                    </VerticalAlign>
                                </Box>

                                <Box>
                                    <VerticalAlign>
                                    { el.earnings }
                                    </VerticalAlign>
                                </Box>

                                <Box>
                                    <VerticalAlign>
                                    { el.nextShift }
                                    </VerticalAlign>
                                </Box>
                            </Grid>

                            <Divider mb={2} />
                            </Box>
                            )
                        })
                    }
                </Box>

                <ButtonGroup>
                    <Link href="find-jobs">
                    <Button colorScheme="orange" rounded="full">
                        Find Jobs
                    </Button>
                    </Link>
                </ButtonGroup>
              </Box>
            
          </Container>
        </Section>

      </Layout>
    )
}

export default Logged;