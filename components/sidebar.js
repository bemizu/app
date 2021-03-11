import React from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useSession } from 'next-auth/client';
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
  Link as ChakraLink, 
} from "@chakra-ui/react";

import { BiMenuAltRight } from "react-icons/bi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";


import theme from "../public/theme.js";


function Sidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  

  const menuItems = [
    {
      text: "Home",
      to: "/",
    },

    // {
    //   text: "About",
    //   to: "/about",
    // },

    // {
    //   text: "Contact",
    //   to: "/contact",
    // },
  ];

  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<HiOutlineMenuAlt1 />}
        rounded="sm"
        transform="rotateY(180deg)"
        aria-label="Menu"
        float="right"
        variant="ghost"
        colorScheme="none"
        fontSize="28px"
        color={ theme.darkBlue }
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent bg={ theme.white }>
            <DrawerCloseButton color={ theme.black } rounded="sm" />
            <DrawerHeader></DrawerHeader>

            <DrawerBody color={ theme.black }>
              {menuItems.map((el) => {
                return (
                  <Box mb={4} key={el.text}>
                    <Box
                      letterSpacing="1"
                      _hover={{ color: theme.blue }}
                      transition="0.2s ease"
                      display="inline-block"
                      fontWeight="600"
                    >
                      <Link href={el.to}>{el.text}</Link>
                    </Box>
                  </Box>
                );
              })}

<Box mb={4} >
                    <Box
                      letterSpacing="1"
                      fontWeight="600"
                      mb={1}
                    >
                      Contact us:
                    </Box>

                    <ChakraLink href="mailto:contact@bemizu.app">
                      contact@bemizu.app
                    </ChakraLink>


                  </Box>

            {/* <AuthBox /> */}

           
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



function AuthBox() {
  const { user, isLoading, logout, loginWithRedirect } = useAuth0();
  const [ session, loading ] = useSession();

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
        rounded="sm"
        size="sm"
        colorScheme="green"
        position="relative"
        onClick={loginWithRedirect}
      >
        Login
      </Button>
      // </Link>
    );
  }
}
