import { useState, useEffect } from "react";
import Layout from "../components/layout";
// import {CometChatUnified} from "../UIKit/CometChat/index.js";
import VerticalAlign from "../components/verticalAlign";
import Section from "../components/section";
import Image from "next/image";
import Session from "../contexts/session";
// import { CometChat } from "@cometchat-pro/chat";

import userbase from "userbase-js";

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Container,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link as ChakraLink,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import theme from "../public/theme";

function Messages() {

  const session = Session( state => state );


  useEffect(() => {
  
  }, []);

  return (
    <Layout title="Messages">
      <Section>
        <Container maxWidth="1200px">
          <Box bg="white" rounded="lg" shadow="lg" p={[3, 6]}>
            <Heading>Messages</Heading>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}

export default Messages;
