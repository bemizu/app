import VerticalAlign from "../components/verticalAlign";
import Image from "next/image";
import userbase from "userbase-js";
import Link from "next/link";
import { RiNotification3Line } from "react-icons/ri";

import { FaRegEnvelope, FaRegBell } from "react-icons/fa";

import Session from "../contexts/session";

import {
  Box,
  Button,
  Grid,
  IconButton,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";

import { BsChevronUp } from "react-icons/bs";

import theme from "../public/theme";

const Header = () => {
  const session = Session((state) => state.session);

  const situation = session.user ? (
    <SimpleGrid
      columns={[3]}
      display="inline-grid"
      maxWidth="160px"
      float="right"
    >
      <Box color="white">
        <VerticalAlign>
          <Menu autoSelect={false}>
            <MenuButton>
              <FaRegBell
                style={{ position: "relative", top: 3, fontSize: 22 }}
              />
            </MenuButton>
            <MenuList>
              <MenuItem color="black" _hover={{ bg: "white" }}>
                No new notifications.
              </MenuItem>
            </MenuList>
          </Menu>
        </VerticalAlign>
      </Box>

      <Box textAlign="center" color="white">
        <VerticalAlign>
          <Link href="/messages">
            <FaRegEnvelope style={{ cursor: "pointer", fontSize: 22 }} />
          </Link>
        </VerticalAlign>
      </Box>

      <Box>
        {" "}
        <Button
          colorScheme="red"
          size="sm"
          rounded="full"
          float="right"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </SimpleGrid>
  ) : (
    <Link href="/login">
      <Button rounded="full" size="md" colorScheme="green" float="right">
        Login
      </Button>
    </Link>
  );

  function logout() {
    userbase
      .signOut()
      .then(() => {
        // user logged out
        window.location.href = "/";
      })
      .catch((e) => console.error(e));
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
        <VerticalAlign>{situation}</VerticalAlign>
      </Box>
    </Grid>
  );
};

export default Header;
