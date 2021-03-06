import {
    Box,
    Heading,  
} from "@chakra-ui/react";

import theme from "../public/theme";

export const PageHeader = ( props ) => {
    return (
        <Heading as={"h1"}  fontSize={["46px", "46px", "80px"]}  fontWeight="600">
            { props.children }
        </Heading>
    )
}

export const SectionTitle = ( props ) => {
    return (
        <Box fontFamily="Roboto" as={"h3"}  fontSize={["46px", "46px", "20px"]}  fontWeight="600">
            { props.children }
        </Box>
    )
}

export const BulletTitle = ( props ) => {
    return (
        <Box fontFamily="Roboto" as={"h2"}  fontSize={["24px", "24px", "56px"]}  fontWeight="400">
            { props.children }
        </Box>
    )
}

export const BodyText = ( props ) => {
    return (
        <Box fontFamily="Roboto"  fontSize={["16px", "16px", "22px", "22px", "26px"]}  fontWeight="400">
            { props.children }
        </Box>
    )
}

