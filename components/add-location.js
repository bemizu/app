import Session from "../contexts/session";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import GoogleMapReact from 'google-map-react';
import { RiMapPinFill } from "react-icons/ri"
import {
  Box,
  Button,
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
  Input,
  Divider,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import VerticalAlign from "./verticalAlign";

const Styles = styled.div`
  .foobar {
    border-radius: 0px !important;
  }

`

function AddTeam(props) {
  const session = Session((state) => state);
  const [locationValue, setLocationValue ] = useState(null);
  const [myLatLng, setMyLatLng ] = useState(null);

  const [location, setLocation] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  function marker () {
    if ( myLatLng ) {
      return <Box style={{transform: 'translate(-50%, -100%)'}} height="40px" width="40px" rounded="full" color="blue.500" fontSize="40px" lat={ myLatLng.lat }
      lng={ myLatLng.lng }
      textAlign="center"
  >
    <VerticalAlign>
      <RiMapPinFill />
      </VerticalAlign>
      </Box>
    }
    
  }
  useEffect(() => {

    
  }, [ locationValue ]);

  function myLocationValue ( meta, action ) {
    let obj = {
      label: meta.label,
      format: {
        main: meta.value.structured_formatting.main_text,
        secondary: meta.value.structured_formatting.secondary,
      },
      place_id: meta.value.place_id,
      terms: meta.terms
    }

      
    setLocationValue( obj );

    geocodeByPlaceId( meta.value.place_id )
    .then(results => {
      let latLng = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }

      setMyLatLng( latLng )
    })
    .catch(error => {
      debugger
    });
  }

  function update(e) {
    let loc = location;
    loc[e.currentTarget.dataset.path] = e.currentTarget.value;
    setLocation(loc);
  }

  async function formSubmit(e) {
    e.preventDefault();

    let loc = location;
    loc.oid = session.organization.id;

    const { data, error } = await session.supabase
      .from("locations")
      .insert([loc]);

    if (!error) {
      const org = await session.supabase
        .from("organizations")
        .select(
          ` 
          id,      
          name,
          website,
          overview,
          culture,
          logo,
          locations (
            id,
            title,
            line1,
            line2,
            city,
            state,
            zip,
            oid
          ),
          jobs (
            id, 
            title, 
            oid,
            lid,
            description, 
            salaryMin, 
            salaryMax, 
            salaryType
          )
            `
        )
        .eq("id", session.organization.id);

      if (!org.error) {
        session.setOrganization(org.data[0]);
        props.setProfileOrganization(org.data[0]);
        onClose();
      } else {
        console.log(error);
        onClose();
      }
    } else {
      console.log(error);
    }
  }

  

  return (
    <Box >
      <Button rounded="sm" colorScheme="green" onClick={onOpen}>
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="sm" mx={4}>
          <form onSubmit={formSubmit}>
            <ModalHeader>Add Location</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

            <FormControl isRequired mb={3}>
                <FormLabel>Title</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={location.title}
                  data-path="title"
                  onChange={update}
                />
              </FormControl>

              <Styles>
              <FormControl mb={4} isRequired>
                <FormLabel>Search</FormLabel>
                <GooglePlacesAutocomplete
                
                  selectProps={{
                    className: "foobar",
                    styles: {
                      borderRadius: 0
                    },
                    placeholder: "Search here...",
                    onChange:  myLocationValue ,
                    
                  }}
                  apiKey="AIzaSyDixXZq9Kdeq-3cpsb1p0XgMQmVjkEvkRU"
                />
              </FormControl>
              </Styles>

              

              
              <Box>
              <FormLabel>Map</FormLabel>
              <Box height="300px" width="100%" rounded="sm" overflow="hidden">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDixXZq9Kdeq-3cpsb1p0XgMQmVjkEvkRU" }}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33
          }}
          defaultZoom={14}
        >

          {
            marker()
          }
          
        </GoogleMapReact>
        </Box>
        </Box>

              

              

              
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose} rounded="sm">
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue" rounded="sm">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddTeam;





