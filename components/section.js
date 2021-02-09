import {
    Box, 
} from "@chakra-ui/react";

function Section ( props ) {
    return <Box py={[10, 10, 20]} px={[3, 5, 10]} bg={ props.bg || "gray.100"}>
        { props.children }
    </Box>
}

export default Section;