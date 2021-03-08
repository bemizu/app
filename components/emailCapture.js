import { useState } from "react";

import {
  Box,
  Grid,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";

import axios from "axios";


import theme from "../public/theme";
import VerticalAlign from "./verticalAlign";

function EmailCapture() {

  function sendToSendgrid () {
    //   let baseUrl = "https://api.sendgrid.com/v3/resource/marketing/contacts"
    //   let headers = {
    //       "Authorization": "Bearer " + process.env.SENDGRID_API_KEY,
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*"
    //   };

      

      let data = {
          email, 
          value,
      }
    
      axios.put('/api/add_to_list'  , {
          data, 
      }).then( handleSuccess ).catch( (resp) => {
          debugger
          // alert
      })

  }

  const [email, setEmail] = useState("");
  const [value, setValue] = useState("employee");
  const [complete, setComplete] = useState(false);

  function updateEmail(e) {
    setEmail(e.currentTarget.value);
  }

  function handleSubmit ( e ) {
      e.preventDefault();
      sendToSendgrid();
  }

  function handleSuccess (resp) {
    debugger
    setComplete( true )

    if ( value == "employee" ) {
        document.querySelectorAll(".employee-survey")[0].click();
    } else if ( value == "employer" ) {
        document.querySelectorAll(".employer-survey")[0].click();
    }
  }

  let chooserBoxActive = email.length ? "active" : "";

  if (complete) {
    return <Box minHeight="40px" rounded="sm" bg={ theme.orange } color="white" px={3} py={2}>
        <VerticalAlign>
        Thank you! Your submission has been receieved. 
        </VerticalAlign>
    </Box>;
  } else {
    return (
      <Box>
          <form onSubmit={ handleSubmit }>
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
              required={ true }
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
  }
}

export default EmailCapture;


