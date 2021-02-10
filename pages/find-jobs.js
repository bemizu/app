import { Box, Container, Heading, Input, SimpleGrid } from "@chakra-ui/react";
import Layout from "../components/layout";
import Section from "../components/section";

function Page () {
    const jobs = [
        {
            id: "job1",
            title: "title",
            description: "description",
            organization: "Organization",
        }, 

        {
            id: "job2",
            title: "title",
            description: "description",
            organization: "Organization",
        },

        {
            id: "job3",
            title: "title",
            description: "description",
            organization: "Organization",
        },

        {
            id: "job4",
            title: "title",
            description: "description",
            organization: "Organization",
        },
    ]
    return (
        <Layout title="Page">
            <Section>
                <Container maxWidth="1200px">
                <Heading mb={4}>
                    Find Jobs
                </Heading>

                <Box mb={ 4 }>
                    <Input bg="white" />
                </Box>

                <Box bg="orange.200" height={[400, 500]} mb={4}>

                </Box>

                <SimpleGrid columns={[1, 2, 3, 4,]} spacing={[4, 6, 8]}>
                    {
                        jobs.map( (el) => {
                            return (
                                <Box key={ el.id } p={[2, 3, 6]} bg="white" rounded="lg" shadow="md" _active={{shadow: "sm"}}>
                                    <Heading mb={2} size="md">
                                        { el.title }
                                    </Heading>


                                </Box>
                            )
                        })
                    }

                </SimpleGrid>
                </Container>
            </Section>
        </Layout>
    )
}

export default Page;