import {
    Box, 
} from "@chakra-ui/react";

import theme from "../public/theme";

export const PageHeader = ( props ) => {
    return (
        <Box fontSize="20px" fontFamily="Roboto Mono" fontWeight="700">
            { props.children }
        </Box>
    )
}

export const TopicHeader = ( props ) => {
    return (
        <Box fontSize="16px" fontFamily="Lato" fontWeight="300">
            { props.children }
        </Box>
    )
}

export const SubHeader = ( props ) => {
    return (
        <Box fontSize="13px" fontFamily="Lato" fontWeight="200" fontStyle="italic">
            { props.children }
        </Box>
    )
}

export const BodyText = ( props ) => {
    return (
        <Box fontSize="10px" fontFamily="Roboto Mono" fontWeight="100" >
            { props.children }
        </Box>
    )
}