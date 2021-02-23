import React from "react";
import Link from "next/link";

import {
  Box,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { BiMenuAltRight } from "react-icons/bi";

import theme from "../public/theme.js";


function Sidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  

  const menuItems = [
    {
      text: "Home",
      to: "/",
    },

    {
      text: "About",
      to: "/about",
    },

    {
      text: "Contact",
      to: "/contact",
    },
  ];

  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<BiMenuAltRight />}
        rounded="sm"
        aria-label="Menu"
        float="right"
        variant="ghost"
        colorScheme="none"
        fontSize="30px"
        color="white"
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent bg={theme.blue}>
            <DrawerCloseButton color="white" rounded="sm" />
            <DrawerHeader></DrawerHeader>

            <DrawerBody color="white">
              {menuItems.map((el) => {
                return (
                  <Box mb={4} key={el.text}>
                    <Box
                      letterSpacing="1"
                      _hover={{ color: "gray.300" }}
                      transition="0.2s ease"
                      display="inline-block"
                      fontWeight="600"
                    >
                      <Link href={el.to}>{el.text}</Link>
                    </Box>
                  </Box>
                );
              })}
            </DrawerBody>

            <DrawerFooter px={5} display="block"></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Sidebar;

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        letterSpacing="1"
        _hover={{ color: "gray.300" }}
        transition="0.2s ease"
        display="inline-block"
        onClick={onOpen}
      >
        Login
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>asdkfjn</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
