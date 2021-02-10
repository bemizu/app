import {
    Box, 
} from "@chakra-ui/react";

function Section ( props ) {
    return <Box py={[5, 10, 20]} px={[0, 5, 10]} bg={ props.bg || "gray.100"}>
        { props.children }
    </Box>
}

export default Section;