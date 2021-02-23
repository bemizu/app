import Link from "next/link";
import Image from "next/image";
import Socials from "../components/socials";
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Divider,
  Grid,
} from "@chakra-ui/react";
import Section from "./section";

function Footer() {
  return (
    <Section bg="#0a0a0a" color="white">
      <Container maxWidth="1200px" textAlign={["center", "center", "left"]}>
        <SimpleGrid columns={[1, 1, 3, 3]}>
          <Box mb={[10, 10, 0]}>
            <Link href="/">
              <Box
                rounded="md"
                height={"60px"}
                width="62px"
                overflow="hidden"
                margin={["0 auto", "0 auto", "0"]}
                cursor="pointer"
              >
                <Image src="/bemizu.jpg" width={62} height={60} alt="sam" />
              </Box>
            </Link>

            <Box mt={5}>
              <Socials />
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Section>
  );
}

export default Footer;
