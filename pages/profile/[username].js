
import { useRouter } from 'next/router'

import { Box, Heading, Container } from "@chakra-ui/react";
import Layout from "../../components/layout";
import Section from "../../components/section";

function Page () {
    const router = useRouter()
    const { username } = router.query

    return (
        <Layout title="Page">
            <Section>
                <Container maxWidth="1200px">
                <Heading>
                    { username }
                </Heading>
                </Container>
            </Section>
        </Layout>
    )
}

export default Page;