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

import theme from "../public/theme";

function Footer() {
  return (
    <Section bg={ theme.white } color="white">
      <Container maxWidth="1200px" textAlign={["center", "center", "left"]}>
        <SimpleGrid columns={[1, 1, 3, 3]}>
          <Box mb={[10, 10, 0]}>
            <Link href="/">
              <Box
                height={"104px"}
                width="101px"
                margin={["0 auto", "0 auto", "0"]}
                cursor="pointer"
              >
                <Image src="/logo-square.svg" width={104} height={101} alt="sam" />
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
