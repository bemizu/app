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
      gridTemplateColumns={["40px calc(100% - 80px) 40px", "40px calc(100% - 80px) 40px", "100px calc(100% - 100px)"]}
      bg={ theme.white }
      height={"70px"}
      position="fixed"
      width="100vw"
      zIndex="600"
      shadow="lg"
      top={"0"}
      pl={[0, 0, 5]}
      pr={[2, 2, 3]}
    >
      <Box display={["block", "block", "none"]} pl={[3]}></Box>
      <Box textAlign={["center", "center", "left"]}>
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
          
        </VerticalAlign>
      </Box>
    </Grid>
  );
};

export default Header;
