import Layout from "../layout";
import { useState } from "react";
import Section from "../section";
import styled from "@emotion/styled";
import VerticalAlign from "../verticalAlign";
import Lorem from "../lorem";
import Image from "next/image";
import Link from "next/link";
import jump from "jump.js";
import theme from "../../public/theme";
import { PageHeader, BodyText } from "../typography";
import EmailCapture from "../emailCapture";

import {
  Link as ChakraLink,
  Box,
  Heading,
  Button,
  ButtonGroup,
  SimpleGrid,
  Stack,
  Container,
  Grid,
  Input,
  useRadioGroup,
  useRadio,
  Radio,
  RadioGroup,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const Styles = styled.div`
  .chooser-box {
    height: 0;
    opacity: 0;
    z-index: -1;
    transition: 0.1s ease;
    margin-top: 4px;
    position: absolute;
    width: 100%;

    &.active {
      height: 40px;
      opacity: 1;
      z-index: 7;
    }
  }

  .mobile-button {
    transition: 0.1s ease;
    margin-top: 0px;

    &.active {
      @media screen and (max-width: ${theme.breakpoints[1]}) {
        margin-top: 44px;
      }
    }
  }
`;

function LoggedOut({ session }) {
  return (
    <Layout title="Home | Bemizu">
      <Styles>
        <Box
          position="relative"
          minHeight={[600, 700, 700, 700, 700]}
          height="calc(100vh - 70px)"
          className="home-hero"
          overflow="hidden"
        >
          <Box
            position="absolute"
            height={[800, 900, 900, 900, 1000]}
            width="100%"
            zIndex="0"
            overflow="hidden"
          >
            <Box overflow="hidden">
              <VerticalAlign>
                <img
                  src="/pattern-vector.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bottom: 50,
                    objectFit: "cover",
                    opacity: 0.6,
                  }}
                />
                {/* <Image src="/pattern-vector.svg" layout="fill" /> */}
              </VerticalAlign>
            </Box>
          </Box>

          <VerticalAlign>
            <Container
              position="relative"
              px={10}
              maxWidth={theme.width}
              mb={["100px", "100px", "150px", "180px"]}
            >
              <Box position="relative" zIndex="2">
                <Box color={theme.white} textAlign="center" mb={[5, 5, 10]}>
                  <PageHeader textAlign="center">Bemizu. Be You.</PageHeader>
                </Box>

                <Box
                  textAlign="center"
                  color={theme.white}
                  maxWidth="600px"
                  margin="0px auto"
                  mb={[5, 5, 10]}
                  fontSize={[16, 18, 20]}
                >
                  Bemizu is where you organize your personal and professional
                  life; where you make time for your life and your work.
                </Box>

                <Box
                  textAlign="center"
                  color={theme.white}
                  maxWidth="460px"
                  margin="0px auto"
                  mb={[10]}
                  fontSize={[16, 18, 20]}
                >
                  We are working diligently to cultivate an environment where
                  you can Be You! (v. You Be You) Stay tuned for new
                  developments.
                </Box>

                <Box maxWidth={["100%", "370px", "370px"]} margin="0px auto">
                  <Box color={theme.white} mb={1} fontSize={[16]}>
                    Sign up for upcoming launch
                  </Box>

                  <EmailCapture />
                </Box>
              </Box>

              <Box
                position="absolute"
                right={["2%", "5%", "8%", "10%", "10%"]}
                height={["200px", "380px", "400px", "440px", "480px"]}
                width={["200px", "380px", "400px", "440px", "480px"]}
                bottom="-150px"
                zIndex="0"
              >
                <Image src="/idea.svg" layout="fill" />
              </Box>

              <Box
                position="absolute"
                bg="#2A82C8"
                rounded="full"
                display={["none", "none", "none", "block"]}
                width="140px"
                height="140px"
                bottom="20%"
                opacity="0.94"
              ></Box>

              <Box
                position="absolute"
                rounded="full"
                bg="#568CED"
                display={["none", "none", "none", "block"]}
                width="80px"
                height="80px"
                bottom="8%"
                left="16%"
                zIndex="100"
                opacity="0.94"
              ></Box>
            </Container>
          </VerticalAlign>

          <Box
            position="absolute"
            width="100%"
            bottom={"0px"}
            height={["13.6vw", "13.6vw"]}
            zIndex="1"
          >
            <img
              src="/landing-wave.svg"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                bottom: -1,
                objectFit: "cover",
              }}
            />
            {/* <Image src="/landing-wave.svg" layout="fill"  /> */}
          </Box>
        </Box>

        <Box id="next" bg={theme.white} pb={20} pt={[5, 5, 10]}>
          <Container position="relative" px={10} maxWidth={theme.width}>
            <Heading mb={[10, 10]} textAlign={["center", "center", "left"]}>
              I have work to offer
            </Heading>

            <SimpleGrid
              columns={[1, 1, 3]}
              spacing={[8, 10, "50px"]}
              textAlign={["center", "center", "left"]}
            >
              <Box>
                <Box height="300px" position="relative" mb={[2, 2, 5]}>
                  <Image src="/be-your-best.svg" layout="fill" />
                </Box>

                <Heading mb={2}>Be your best</Heading>

                <Box>
                  Offer your talents and look for opportunities set around your
                  schedule
                </Box>
              </Box>

              <Box>
                <Box height="300px" position="relative" mb={[2, 2, 5]}>
                  <Image src="/personal.svg" layout="fill" />
                </Box>

                <Heading mb={2}>Personal</Heading>

                <Box>
                  Keep track of all of your jobs and personal events in one
                  versatile calendar
                </Box>
              </Box>

              <Box>
                <Box height="300px" position="relative" mb={[2, 2, 5]}>
                  <Image src="/synced-up.svg" layout="fill" />
                </Box>

                <Heading mb={2}>Synced up</Heading>

                <Box>
                  Get synced up with your team to provide the best value (inside
                  or outside of work)
                </Box>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <Box bg={theme.white} position="relative" overflow="hidden" px={5}>
          <Box
            position="absolute"
            height={[800, 900, 900, 900, 1000]}
            top="100px"
            width="100%"
            left="0"
            zIndex="0"
            overflow="hidden"
          >
            <Box overflow="hidden">
              <VerticalAlign>
                <img
                  src="/pattern-vector.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bottom: 50,
                    objectFit: "cover",
                    opacity: 0.6,
                  }}
                />
                {/* <Image src="/pattern-vector.svg" layout="fill" /> */}
              </VerticalAlign>
            </Box>
          </Box>

          <Container
            bg="white"
            maxWidth={theme.width}
            px={[10, 10, 20]}
            py={[10, 10]}
            position="relative"
            zIndex="4"
            mb={20}
          >
            <Heading mb={[5, 5, 10]} textAlign={["center", "center", "left"]}>
              I have work to be done
            </Heading>

            <SimpleGrid
              columns={[1, 1, 2]}
              spacing={[10, 10, 20]}
              textAlign={["center", "center", "left"]}
            >
              <Box>
                <Box
                  height={[250, 300, "400px"]}
                  position="relative"
                  mb={[1, 1, 5]}
                >
                  <Image src="/manage-and-recruit.svg" layout="fill" />
                </Box>

                <Heading mb={2}>Manage and recruit</Heading>

                <Box>
                  Gain full HR support and solutions from hiring to payroll
                </Box>
              </Box>

              <Box>
                <Box
                  height={[250, 300, "400px"]}
                  position="relative"
                  mb={[1, 1, 5]}
                >
                  <Image src="/hr-partnerships.svg" layout="fill" />
                </Box>

                <Heading mb={2}>Gain HR partnerships</Heading>

                <Box>
                  Reach out to your potential team members through our partner
                  network (Indeed, Craigslist, Monster, PoachedJob, and more)
                </Box>
              </Box>
            </SimpleGrid>
          </Container>

          <Container
            bg={theme.blue}
            maxWidth={theme.width - 100}
            px={[10, 10, 20]}
            py={[10, 10, 20]}
            position="relative"
            zIndex="5"
            mb={5}
          >
            <Box
              maxWidth="800px"
              margin="0 auto"
              textAlign="center"
              color={theme.white}
              mb={[10, 10, 20]}
            >
              <PageHeader>Sign up for our upcoming launch!</PageHeader>
            </Box>

            <Box maxWidth={["100%", "320px", "370px"]} margin="0 auto">
              <EmailCapture />
            </Box>

            <Box
              position="absolute"
              bg="#2A82C8"
              rounded="full"
              display={["none", "none", "none", "block"]}
              width="140px"
              height="140px"
              left="2%"
              top="20%"
              opacity="0.94"
            ></Box>

            <Box
              position="absolute"
              rounded="full"
              bg="#568CED"
              display={["none", "none", "none", "block"]}
              width="80px"
              height="80px"
              bottom="10%"
              right="12%"
              zIndex="100"
              opacity="0.94"
            ></Box>
          </Container>
        </Box>

        <EmployeeSurvey />
        <EmployerSurvey />
      </Styles>
    </Layout>
  );
}

export default LoggedOut;

function EmployeeSurvey() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box className="employee-survey" onClick={onOpen}>
        
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent mx={5} rounded="sm" bg={theme.white}>
          <ModalHeader>Do you have an extra minute for a survey?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={3}>
              <FormLabel>Name</FormLabel>

              <Input bg="white" rounded="sm" />
            </FormControl>

            <FormControl isRequired mb={3}>
              <FormLabel>What are your skills?</FormLabel>

              <Input bg="white" rounded="sm" />

              <FormHelperText>Use commas to seperate skills</FormHelperText>
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Years of experience?</FormLabel>

              <NumberInput bg="white" min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mb={5}>
              <FormLabel>Highest level of education?</FormLabel>

              <LevelOfEducation />
            </FormControl>

            <Box textAlign="center" mb={4}>
              <Box mb={3}>
                <Button colorScheme="orange" rounded="sm" size="lg">
                  Submit
                </Button>
              </Box>

              <Box>
                <ChakraLink onClick={onClose}>
                  No, thank you. I don’t want to take this survey.
                </ChakraLink>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function EmployerSurvey() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box className="employer-survey" onClick={onOpen}>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="sm" bg={theme.white}>
          <ModalHeader>Do you have an extra minute for a survey?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>


          <Box textAlign="center" mb={4}>
              <Box mb={3}>
                <Button colorScheme="orange" rounded="sm" size="lg">
                  Submit
                </Button>
              </Box>

              <Box>
                <ChakraLink onClick={onClose}>
                  No, thank you. I don’t want to take this survey.
                </ChakraLink>
              </Box>
            </Box>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        mb={4}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="sm"
        boxShadow="md"
        bg="white"
        _checked={{
          bg: theme.blue,
          color: "white",
          borderColor: "blue.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function LevelOfEducation() {
  const options = [
    "GED",
    "Associate's",
    "Bootcamp",
    "Bachelor's",
    "Master's",
    "Other",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group} spacing={4} wrap={"wrap"}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
