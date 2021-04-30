import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  Grid,
  Link as ChakraLink,
  Stack,
  Input,
  Button,
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

import axios from "axios";

import theme from "../public/theme";
import VerticalAlign from "./verticalAlign";
import { useRef } from "react";

function EmailCapture() {
  let emplyeeRef = useRef(null);
  let emplyerRef = useRef(null);

  function sendToSendgrid() {
    //   let baseUrl = "https://api.sendgrid.com/v3/resource/marketing/contacts"
    //   let headers = {
    //       "Authorization": "Bearer " + process.env.SENDGRID_API_KEY,
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*"
    //   };

    let data = {
      email,
      value,
    };

    axios
      .put("/api/add_to_list", {
        data,
      })
      .then(handleSuccess)
      .catch((resp) => {
        // alert
      });
  }

  const [email, setEmail] = useState("");
  const [value, setValue] = useState("employee");
  const [complete, setComplete] = useState(false);

  function updateEmail(e) {
    setEmail(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendToSendgrid();
  }

  function handleSuccess(resp) {
    setComplete(true);

    if (value == "employee") {
      emplyeeRef.current.click();
    } else if (value == "employer") {
      emplyerRef.current.click();
    }
  }

  let chooserBoxActive = email.length ? "active" : "";

  let myView = complete ? (
    <Box
      minHeight="40px"
      rounded="sm"
      bg={theme.orange}
      color="white"
      px={3}
      py={2}
      fontSize={["sm", "md"]}
    >
      <VerticalAlign>
        Thank you! Your submission has been receieved.
      </VerticalAlign>
    </Box>
  ) : (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid
          templateColumns={["repeat(100%)", "calc(100% - 92px) 88px"]}
          gap={"4px"}
        >
          <Box>
            <Input
              bg={theme.white}
              color={theme.darkBlue}
              rounded="sm"
              onChange={updateEmail}
              type="email"
              placeholder="Enter your email"
              required={true}
            />

            <Box position="relative">
              <Box
                className={"chooser-box " + chooserBoxActive}
                bg={theme.white}
                rounded="sm"
                shadow="md"
              >
                <RadioGroup onChange={setValue} value={value} margin="0 auto">
                  <Stack direction="row" py={2}>
                    <Radio value="employee" mx={2}>
                      <small>I am a job seeker</small>
                    </Radio>
                    <Radio value="employer" mx={2}>
                      <small>I am an employer</small>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
          </Box>

          <Box className={"mobile-button " + chooserBoxActive}>
            <Button
              bg={theme.orange}
              rounded="sm"
              width="100%"
              color={theme.white}
              type="submit"
              _hover={{ bg: "#D37123" }}
              _active={{ bg: "#D37123" }}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );

  return (
    <Box>
      {myView}

      <EmployeeSurvey emplyeeRef={emplyeeRef} email={email} />
      <EmployerSurvey emplyerRef={emplyerRef} email={email} />
    </Box>
  );
}

export default EmailCapture;

function EmployeeSurvey(props) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_ANON
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [years, setYears] = useState("");
  const [education, setEducation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // database call here
    const { data, error } = await supabase
      .from("SurveyResponsesEmployees")
      .insert([
        {
          name,
          email: props.email,
          skills,
          years,
          education,
        },
      ]);

    //alert thank you
    onClose();
  }

  return (
    <>
      <Box
        className="employee-survey"
        ref={props.emplyeeRef}
        onClick={onOpen}
      ></Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent mx={5} rounded="sm" bg={theme.white}>
          <ModalHeader>Do you have an extra minute for a survey?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                type="hidden"
                className="employee-hidden"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <FormControl isRequired mb={3}>
                <FormLabel>Name</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>What are your skills?</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  onChange={(e) => {
                    setSkills(e.currentTarget.value);
                  }}
                />

                <FormHelperText>Use commas to seperate skills</FormHelperText>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Years of experience?</FormLabel>

                <NumberInput
                  bg="white"
                  min={0}
                  onChange={(e) => {
                    setYears(e);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mb={5}>
                <FormLabel>Highest level of education?</FormLabel>

                <LevelOfEducation setEducation={setEducation} />
              </FormControl>

              <Box textAlign="center" mb={4}>
                <Box mb={3}>
                  <Button
                    colorScheme="orange"
                    rounded="sm"
                    size="lg"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>

                <Box>
                  <ChakraLink onClick={onClose}>
                    No, thank you. I don’t want to take this survey.
                  </ChakraLink>
                </Box>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function EmployerSurvey(props) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_ANON
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [positions, setPositions] = useState("");
  const [capacity, setMaxCapacity] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("SurveyResponsesEmployers")
      .insert([
        {
          name,
          email: props.email,
          positions,
          maximum: capacity,
          days: daysPerWeek,
          hours: hoursPerDay,
        },
      ]);

    onClose();
  }

  return (
    <>
      <Box
        className="employer-survey"
        ref={props.emplyerRef}
        onClick={onOpen}
      ></Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="sm" bg={theme.white} mx={5}>
          <ModalHeader>Do you have an extra minute for a survey?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input type="hidden" name="email" className="employer-hidden" />

              <FormControl isRequired mb={3}>
                <FormLabel>Your business name</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Number of positions for your business</FormLabel>

                <NumberInput
                  bg="white"
                  min={0}
                  onChange={(e) => {
                    setPositions(e);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>
                  Number of team members needed to operate at maximum capacity
                </FormLabel>

                <NumberInput
                  bg="white"
                  min={0}
                  onChange={(e) => {
                    setMaxCapacity(e);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>
                  How many days per week does your business stay open?
                </FormLabel>
                <DaysPerWeek setDaysPerWeek={setDaysPerWeek} />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>
                  How many hours a day is your business open?
                </FormLabel>
                <HoursPerDay setHoursPerDay={setHoursPerDay} />
              </FormControl>

              <Box textAlign="center" mb={4}>
                <Box mb={3}>
                  <Button
                    colorScheme="orange"
                    rounded="sm"
                    size="lg"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>

                <Box>
                  <ChakraLink onClick={onClose}>
                    No, thank you. I don’t want to take this survey.
                  </ChakraLink>
                </Box>
              </Box>
            </form>
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

function LevelOfEducation(props) {
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
    onChange: props.setEducation,
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

function DaysPerWeek(props) {
  const options = ["3", "4", "5", "6", "7", "Other"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: props.setDaysPerWeek,
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

function HoursPerDay(props) {
  const options = ["8", "10", "12", "14", "16", "Other"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: props.setHoursPerDay,
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
