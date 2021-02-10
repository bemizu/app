import { Box, Heading, Container } from "@chakra-ui/react";
import Layout from "../components/layout";
import Section from "../components/section";

function Page () {
    return (
        <Layout title="Page">
            <Section>
                <Container maxWidth="1200px">
                <Heading>
                    Page
                </Heading>
                </Container>
            </Section>
        </Layout>
    )
}

export default Page;