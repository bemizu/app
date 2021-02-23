import VerticalAlign from "../components/verticalAlign";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";

import { FaRegEnvelope, FaRegBell } from "react-icons/fa";

import Session from "../contexts/session";

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

import theme from "../public/theme";

const Header = () => {
  const { user, logout  } = useAuth0();

  const situation = user ? (
    <Grid
      templateColumns={"40px 40px 70px"}
      display="inline-grid"
      position="relative"
      top="3px"
      right="6px"
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
    </Grid>
  ) : (
    <Link href="/login">
      <Button rounded="full" size="sm" colorScheme="green" float="right">
        Login
      </Button>
    </Link>
  );

  
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
        <VerticalAlign>
          
          <Sidebar />
          { situation }
        </VerticalAlign>
      </Box>
    </Grid>
  );
};

export default Header;
