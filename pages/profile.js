import { Widget } from "@uploadcare/react-widget";
import toast from "react-hot-toast";
import Link from "next/link"
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import {
  Box,
  ButtonGroup,
  Link as ChakraLink,
  Heading,
  SimpleGrid,
  Button,
  Grid,
  Divider,
  Container,
  FormControl,
  FormLabel,
  HStack,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Checkbox,
  useRadioGroup,
  useRadio,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { BiPlus, BiPhoneCall, BiMailSend, BiSave } from "react-icons/bi";
import { RiMapPinFill } from "react-icons/ri";
import Loading from "../components/Home/Loading";
import Layout from "../components/layout";
import VerticalAlign from "../components/verticalAlign";
import MyQuill from "../components/quill";
import styled from "@emotion/styled";
import theme from "../public/theme";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Session from "../contexts/session";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Navigator from "../components/navigator";
import PageContainer from "../components/pageContainer";
import { GetUser } from "../utils/getUser";
import { BiTrash } from "react-icons/bi";
import Image from "next/image";
import AddLocation from "../components/add-location";
import ThemeBox from "../components/theme-box";
import AddTeamMember from "../components/add-team";
import EditTeam from "../components/edit-team";
import EditLocation from "../components/edit-location";
import UploadClient from "@uploadcare/upload-client";

const Styles = styled.div``;
const client = new UploadClient({ publicKey: "8514f02a633e4dc5af92" });

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Page() {
  const widgetApi = useRef();
  const router = useRouter();
  const session = Session((state) => state);
  const { user } = useAuth0();
  const [profileUser, setProfileUser] = useState({});
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        ["bold", "italic", "underline", "strike"],
        ["link"],
        [{ list: "bullet" }],
      ],
    },
  });
  const [profileOrganization, setProfileOrganization] = useState(
    session.organization || {
      locations: [],
      jobs: [],
      team_members: [],
    }
  );

  function updateQuill() {
    quill.setContents(JSON.parse(profileOrganization.overview));
  }

  function effectCallback() {
    if (quill && profileOrganization.id) {
      setTimeout(updateQuill);
    }

    if (!session.user) {
      GetUser(user, session, setProfileUser, setProfileOrganization);
    } else {
      setProfileUser(session.user);
      setProfileOrganization(session.organization);
    }
  }

  useEffect(effectCallback, [session.organization, quill]);

  async function saveOrg(e) {
    e.preventDefault();

    let orgToUpdate = JSON.parse(JSON.stringify(profileOrganization));
    orgToUpdate.overview = JSON.stringify(quill.getContents());
    delete orgToUpdate.jobs;
    delete orgToUpdate.locations;
    delete orgToUpdate.team_members;

    const { data, error } = await session.supabase
      .from("organizations")
      .update(orgToUpdate)
      .match({ uuid: session.user.id });

    if (!error) {
      session.refreshOrg(session);
      toast.success("Update successful.");
    } else {
      console.log(error);
    }
  }

  async function removeLocation(id) {
    const { data, error } = await session.supabase
      .from("locations")
      .delete()
      .match({ id });

    if (!error) {
      toast.success("Location removed.");
      session.refreshOrg(session);
    } else {
      console.log(error);
    }
  }

  async function removeTeam(id) {
    const { data, error } = await session.supabase
      .from("team_members")
      .delete()
      .match({ id });

    if (!error) {
      toast.success("Team member removed.");
      session.refreshOrg(session);
      // useForceUpdate()
    } else {
      console.log(error);
    }
  }

  function setImage({ cdnUrl }) {
    let org = profileOrganization;
    org.logo = cdnUrl;
    setProfileOrganization(org);

    // save org
  }

  function removeProfileImage() {
    // delete image uploadcare
    let org = profileOrganization;
    org.logo = "";
    setProfileOrganization(org);
    // save org
  }

  function profileImage() {
    if (profileOrganization.logo) {
      return <Image src={profileOrganization.logo} width="140" height="140" />;
    }
  }

  function removeImage() {
    if (profileOrganization.logo) {
      return (
        <Box>
          <ChakraLink fontSize="sm" color={theme.blue} onClick={deleteImage}>
            Remove
          </ChakraLink>
        </Box>
      );
    }
  }

  function deleteImage() {
    // https://ucarecdn.com/cf0aca01-6686-42b9-a8a7-86bb10ded568/

    let data = {
      storageId: profileOrganization.logo.split(".com/")[1].split("/")[0],
    };

    axios
      .put("/api/delete_image", {
        data,
      })
      .then((resp, b, c, d) => {
        debugger;
        removeProfileImage();
      })
      .catch((resp, b, c, d) => {
        debugger;
      });
  }

  function setBusinessSize(val) {
    let org = profileOrganization;
    org.businessSize = val;
    setProfileOrganization(org);
  }

  function update(e) {
    let org = profileOrganization;
    org[e.currentTarget.dataset.path] = e.currentTarget.value;
    setProfileOrganization(org);

    // switch ( e.currentTarget.dataset.path ) {
    //   case "name":

    //     break;

    //   default:
    //     break;
    // }
  }

  if (!profileOrganization) {
    return <Loading />;
  }

  if (typeof profileOrganization.id == undefined) {
    return <Loading />;
  }

  return (
    <Layout title="Profile">
      <PageContainer path={router.pathname}>
        <ThemeBox>
          <form onSubmit={saveOrg}>
            <ButtonGroup variant="ghost" isAttached float="right">
              <IconButton
                size="lg"
                icon={<BiSave />}
                color={theme.darkBlue}
                fontSize="32px"
                rounded="lg"
                type="submit"
              />
                
              <Link href={"/profile/" + profileOrganization.id}>
              <IconButton
                size="lg"
                icon={<AiOutlineEye />}
                color={theme.darkBlue}
                rounded="lg"
                fontSize="32px"
              />
              </Link>
            </ButtonGroup>

            <Heading mb={2} color={theme.darkBlue}>
              Profile
            </Heading>

            <Divider mb={[2, 2, 4]} />

            <Box mb={3}>
              <FormLabel mb={0} color={theme.darkBlue}>
                Logo
              </FormLabel>
              <Box
                position="relative"
                overflow="hidden"
                rounded="sm"
                bg="gray.400"
                color="gray.600"
                fontSize="22px"
                height="140px"
                width="140px"
                _hover={{ bg: "gray.300", color: "gray.400" }}
                transition="0.2s ease"
                cursor="pointer"
                textAlign="center"
                mb={2}
                onClick={() => widgetApi.current.openDialog()}
              >
                {profileImage()}
                <VerticalAlign>
                  <BiPlus
                    style={{
                      display: "inline-block",
                      position: "relative",
                      bottom: 3,
                      left: 2,
                    }}
                  />
                </VerticalAlign>
              </Box>

              <Box>{removeImage()}</Box>

              <Box position="relative">
                <Box opacity="0" position="absolute" zIndex={-1}>
                  <Widget
                    imagesOnly={true}
                    ref={widgetApi}
                    publicKey="8514f02a633e4dc5af92"
                    onChange={setImage}
                  />
                </Box>
              </Box>

              <Input
                bg="white"
                rounded="sm"
                type="hidden"
                defaultValue={profileOrganization.logo}
                onChange={update}
              />
            </Box>

            {/* <Box>
              <FormControl isRequired mb={3}>
                <FormLabel mb={0}>Username</FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={profileOrganization.username}
                  data-path="username"
                  onChange={update}
                />
                
                <FormHelperText>
                  Lowercase letters and "-" only. For setting the url of your business page. 
                </FormHelperText>
              </FormControl>
            </Box> */}

            <Box>
              <FormControl isRequired mb={3}>
                <FormLabel mb={0} color={theme.darkBlue}>
                  Name
                </FormLabel>

                <Input
                  bg="white"
                  rounded="sm"
                  defaultValue={profileOrganization.name}
                  data-path="name"
                  onChange={update}
                />
              </FormControl>
            </Box>

            <FormControl mb={3}>
              <FormLabel mb={0} color={theme.darkBlue}>
                Overview
              </FormLabel>

              <Box
                bg="white"
                rounded="sm"
                fontFamily="Roboto !important"
                value={""}
                // data-path="description"
                // onChange={update}
                ref={quillRef}
              />

              {/* <Textarea
                rows={10}
                bg="white"
                rounded="sm"
                placeholder="Add your mission statement"
                defaultValue={profileOrganization.overview}
                data-path="overview"
                onChange={update}
              /> */}
            </FormControl>

            <FormControl mb={3}>
              <FormLabel mb={0} color={theme.darkBlue}>
                Website
              </FormLabel>

              <Input
                type="url"
                bg="white"
                rounded="sm"
                placeholder="https://example.com"
                defaultValue={profileOrganization.website}
                data-path="website"
                onChange={update}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel mb={0} color={theme.darkBlue}>
                Industry
              </FormLabel>
              <Select
                placeholder="Select option"
                rounded="sm"
                data-path="industry"
                bg="white"
                defaultValue={profileOrganization.industry}
                onChange={update}
              >
                <option value="creative">Creative</option>
                <option value="events">Events</option>
                <option value="fitness">Fitness</option>
                <option value="hospitality">Hospitality</option>
                {/* <option value="real-estate">Real Estate</option> */}
                <option value="dining">Restaurant/Dining</option>
                <option value="transportation">Transportation</option>
                <option value="warehousing">Warehousing</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel mb={0} color={theme.darkBlue}>
                Business Size
              </FormLabel>
              <BusinessSize
                org={profileOrganization}
                setBusinessSize={setBusinessSize}
              />
            </FormControl>
          </form>
        </ThemeBox>

        <ThemeBox>
          <AddTeamMember setProfileOrganization={setProfileOrganization} />

          <Heading mb={2} color={theme.darkBlue}>
            Team Members
          </Heading>

          <Divider mb={[2, 2, 4]} />

          <Box>
            <Grid
              templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
              gap={[4, 5, 6]}
            >
              {profileOrganization.team_members.map((el, idx) => {
                let image = el.image ? (
                  <Image src={el.image} layout="fill" objectFit="cover" />
                ) : (
                  ""
                );
                return (
                  <Box key={"mem" + el.id} rounded="lg" py={[2, 3, 4]} px={2}>
                    <Box>
                      <Box
                        height="92px"
                        margin="0 auto"
                        width="80px"
                        position="relative"
                        bg={"gray.200"}
                        rounded="md"
                        overflow="hidden"
                        mb={2}
                      >
                        {image}
                      </Box>
                    </Box>

                    <Box textAlign="center">
                      <Box>
                        <Box fontWeight="500">{el.name}</Box>

                        <Box
                          fontWeight="300"
                          fontSize="lg"
                          lineHeight="18px"
                          mb={2}
                        >
                          {el.title}
                        </Box>
                      </Box>

                      <ButtonGroup
                        isAttached
                        variant="ghost"
                        rounded="sm"
                        margin="0 auto"
                      >
                        <IconButton
                          as="a"
                          href={"tel:" + el.phone}
                          icon={<BiPhoneCall />}
                        />
                        <IconButton
                          as="a"
                          href={"mailto:" + el.email}
                          icon={<BiMailSend />}
                        />
                        <EditTeam
                          el={el}
                          setProfileOrganization={setProfileOrganization}
                        />

                        <IconButton
                          icon={
                            <AlertDialogExample
                              id={el.id}
                              callback={removeTeam}
                            />
                          }
                        />
                      </ButtonGroup>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Box>
        </ThemeBox>

        <ThemeBox>
          <AddLocation setProfileOrganization={setProfileOrganization} />

          <Heading color={theme.darkBlue} mb={2}>
            Locations
          </Heading>

          <Divider mb={[2, 2, 4]} />

          <Grid
            templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
            gap={[4, 5, 6]}
          >
            {profileOrganization.locations.map((el, idx) => {

              console.log( el )
              function marker() {
                return (
                  <Box
                    style={{ transform: "translate(-50%, -100%)" }}
                    height="40px"
                    width="40px"
                    rounded="full"
                    color="blue.500"
                    fontSize="40px"
                    lat={el.latLng.lat}
                    lng={el.latLng.lng}
                    textAlign="center"
                  >
                    <VerticalAlign>
                      <RiMapPinFill />
                    </VerticalAlign>
                  </Box>
                );
              }

              return (
                <Box key={"loc" + el.id}>
                  <Box>
                    <Grid
                      templateColumns={[
                        "100% 100%",
                        "100% 100%",
                        "300px calc(100% - 280px)",
                      ]}
                      gap="20px"
                    >
                      <Box>
                        <Box height="220px" bg="gray.100" rounded="sm" mb={2}>
                          <GoogleMapReact
                            bootstrapURLKeys={{
                              key: "AIzaSyDixXZq9Kdeq-3cpsb1p0XgMQmVjkEvkRU",
                            }}
                            defaultCenter={{
                              lat: el.latLng.lat,
                              lng: el.latLng.lng,
                            }}
                            defaultZoom={12}
                          >
                            {marker()}
                          </GoogleMapReact>
                        </Box>

                        <ButtonGroup
                          isAttached
                          variant="ghost"
                          rounded="sm"
                          mb={1}
                        >
                          <IconButton
                            icon={
                              <EditLocation
                                el={el}
                                setProfileOrganization={setProfileOrganization}
                              />
                            }
                          />

                          <AlertDialogExampleLocation
                            id={el.id}
                            callback={removeLocation}
                          />
                        </ButtonGroup>
                      </Box>

                      <Box>
                        <Heading size="md" fontWeight="500" mb={2}>{el.title}</Heading>
                        <ChakraLink href={`https://www.google.com/maps/place/?q=place_id:${ el.locObj.place_id }`} color={ theme.blue } target="_blank" display="inline-block" rounded="md">
                        <Box
                          fontWeight="300"
                          maxWidth="250px"
                          
                        >
                          {/* { el.locObj.label.split(",")[1] } */}
                          { el.locObj.label }
                        </Box>

                        {/* <Box
                          fontWeight="300"
                        >
                          { .split(",")[2] + ", " + el.locObj.label.split(",")[3] + ", " + el.locObj.label.split(",")[4] }
                        </Box> */}
                        </ChakraLink>

                     
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              );
            })}
          </Grid>

          <Box mb={4} mt={4} display="none">
            <Checkbox>Remote available?</Checkbox>
          </Box>
        </ThemeBox>

        <ThemeBox>
          <Heading mb={2} color={theme.darkBlue}>
            Gallery
          </Heading>
          <Divider mb={[2, 2, 4]} />
        </ThemeBox>

{/*         
        <ThemeBox>
          <Heading mb={2} color={theme.darkBlue}>
            Additional Information
          </Heading>
          <Divider mb={[2, 2, 4]} />

          <Box fontSize="sm" mb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Box>

          <FormControl mb={3}>
            <FormLabel mb={0} color={theme.darkBlue}>
              Culture
            </FormLabel>

            <Textarea
              bg="white"
              rounded="sm"
              placeholder="What makes you great"
              defaultValue={profileOrganization.culture}
              data-path="culture"
              onChange={update}
            />
          </FormControl>
        </ThemeBox> */}
      </PageContainer>
    </Layout>
  );
}

export default withAuthenticationRequired(withRouter(Page), {
  onRedirecting: () => <Loading />,
});

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

function BusinessSize(props) {
  const options = ["1-10", "11-20", "21-50", "51-100", "100+"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: props.org.businessSize,
    onChange: props.setBusinessSize,
  });

  // console.log(props.org.businessSize);
  const group = getRootProps();

  return (
    <HStack {...group} spacing={2} wrap={"wrap"}>
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

function AlertDialogExample(props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  function actuallyRemove() {
    // remove

    props.callback(props.id);

    onClose();
  }

  return (
    <>
      <BiTrash
        style={{ display: "inline-block" }}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Team Member
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="blue"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="green" onClick={actuallyRemove} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function AlertDialogExampleLocation(props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  function actuallyRemove() {
    // remove

    props.callback(props.id);

    onClose();
  }

  return (
    <>
      <IconButton
        icon={<BiTrash style={{ display: "inline-block" }} />}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Location
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="blue"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="green" onClick={actuallyRemove} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
