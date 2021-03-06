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
      <Container maxWidth="1200px" textAlign={["center", "center"]}>
          <Box mb={[10, 10, 0]}>
            <Link href="/">
              <Box
                margin={["0 auto", "0 auto"]}
                cursor="pointer"
              >
                <Image src="/logo-long.png" width={145} height={43} alt="sam" />
              </Box>
            </Link>

            <Box mt={5} textAlign="center">
              <Socials />
            </Box>
          </Box>
      </Container>
    </Section>
  );
}

export default Footer;
