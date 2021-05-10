import { Box, Grid, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  BiHome,
  BiBuilding,
  BiEnvelope,
  BiCalendar,
  BiBriefcase,
} from "react-icons/bi";



import Link from "next/link";


import theme from "../public/theme";

const Styles = styled.div``;

function Navigator({ path }) {
  let items = [
    {
      title: "Home",
      link: "/",
      icon: <BiHome style={{ display: "inline-block" }} />,
      active: path == "/",
    },

    {
      title: "Profile",
      link: "/profile",
      icon: <BiBuilding style={{ display: "inline-block" }} />,
      active: path == "/profile",
    },

    {
      title: "Messages",
      link: "/messages",
      icon: <BiEnvelope style={{ display: "inline-block" }} />,
      active: path == "/messages",
    },

    {
      title: "Schedule",
      link: "/schedule",
      icon: <BiCalendar style={{ display: "inline-block" }} />,
      active: path == "/schedule",
    },

    {
      title: "Jobs",
      link: "/jobs",
      icon: <BiBriefcase style={{ display: "inline-block" }} />,
      active: path == "/jobs",
    },

    
  ];

  return (
    <Styles>
      <Grid
        width="100%"
        bg={[theme.white, theme.white, "none"]}
        zIndex={800}
        left={0}
        borderTopWidth={[2, 2, 0]}
        borderColor={"gray.300"}
        position={["fixed", "fixed", "relative"]}
        bottom={0}
        shadow={["lg", "lg", "none"]}
        gridTemplateColumns={[
          "repeat( auto-fit, minmax(50px, 1fr) )",
          "repeat( auto-fit, minmax(50px, 1fr) )",
          "repeat(100%)",
        ]}
        gap={[0, 0, "12px"]}
        
      >
        {items.map((el) => {
          let color = el.active
            ? [theme.orange, theme.orange, theme.orange]
            : [theme.darkBlue, theme.darkBlue, theme.white];
          let hoverColor = el.active
            ? theme.orange + "cc"
            : [
                { color: theme.blue },
                { color: theme.blue },
                { color: theme.lightBlue },
              ];

          return (
            <Box key={"navigator-" + el.title.slice(0, 5)} textAlign="center">
              <Link href={el.link}>
                <Box
                  rounded="lg"
                  _hover={hoverColor}
                  transition="all 0.1s ease"
                  maxWidth="80px"
                  margin="0 auto"
                  pb={2}
                  color={color}
                  cursor="pointer"
                >
                  <Box fontSize={[24, 24, 29]} mb="1px">
                    {el.icon}
                  </Box>

                  <Heading size="xs">{el.title}</Heading>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Grid>
    </Styles>
  );
}

export default Navigator;
