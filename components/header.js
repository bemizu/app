import VerticalAlign from "../components/verticalAlign";
import Image from "next/image";
import userbase from "userbase-js";
import Link from "next/link";

import Session from "../contexts/session";

import { Box, Button, Grid, IconButton } from "@chakra-ui/react";

import { BsChevronUp } from "react-icons/bs";

import theme from "../public/theme";

const Header = () => {
  const session = Session((state) => state.session);

  const authButton = session.user ? (
    <Button colorScheme="red" rounded="full" float="right" onClick={ logout }>
      Logout
    </Button>
  ) : (
    <Link href="/login">
      <Button rounded="full" colorScheme="green" float="right">
        Login
      </Button>
    </Link>
  );

  function logout () {
    userbase.signOut().then(() => {
        // user logged out
        window.location.href = "/"

    }).catch((e) => console.error(e))
  }
  return (
    <Grid
      gridTemplateColumns="100px calc(100% - 100px)"
      bg={theme.blue}
      height={["60px", "60px", "70px"]}
      position="fixed"
      width="100vw"
      zIndex="600"
      top={"0"}
      px={5}
    >
      <Box>
        <VerticalAlign>
          <Link href="/">
            <Image src="/bemizu.jpg" width={60} height={60} alt="Home" />
          </Link>
        </VerticalAlign>
      </Box>

      <Box>
        <VerticalAlign>{authButton}</VerticalAlign>
      </Box>
    </Grid>
  );
};

export default Header;
