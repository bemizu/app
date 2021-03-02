import VerticalAlign from "../components/verticalAlign";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";
import { useSession } from 'next-auth/client';
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
  Spinner,
} from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

import theme from "../public/theme";
import { useState } from "react";

const Header = () => {
  return (
    <Grid
      gridTemplateColumns="100px calc(100% - 100px)"
      bg={ theme.white }
      height={"70px"}
      position="fixed"
      width="100vw"
      zIndex="600"
      shadow="lg"
      top={"0"}
      px={5}
    >
      <Box>
        <VerticalAlign>
          <Link href="/">
            <Box display="inline-block" cursor="pointer" width="160px" height="48px" position="relative" top={0} left={0}>
            <Image src="/logo-long.png" layout="fill" objectFit="cover" alt="Logo Square"  />
            </Box>
          </Link>
        </VerticalAlign>
      </Box>

      <Box>
        <VerticalAlign>
          <Sidebar />
          <AuthBox />
        </VerticalAlign>
      </Box>
    </Grid>
  );
};

export default Header;

function AuthBox() {
  const { user, isLoading, logout, loginWithRedirect } = useAuth0();
  const [ session, loading ] = useSession();

  if (isLoading) {
    return (
      <Box float="right" >
        <Spinner size="sm" position="relative" top="7px" right="14px" />
      </Box>
    );
  }

  if (user) {
    return (
      <Grid
        templateColumns={"40px 40px 70px"}
        display="inline-grid"
        position="relative"
        top="3px"
        right="6px"
        float="right"
      >
        <Box color={ theme.blue }>
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

        <Box textAlign="center" color={ theme.blue }>
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
    );
  } else {
    return (
      // <Link href="/api/auth/signin">
      <Button
        rounded="full"
        size="sm"
        colorScheme="green"
        float="right"
        position="relative"
        top="3px"
        right="8px"
        onClick={loginWithRedirect}
      >
        Login
      </Button>
      // </Link>
    );
  }
}
