import {
    Box, 
} from "@chakra-ui/react";

function Section ( props ) {
    return <Box py={[5, 10, 10]} px={[2, 5, 10]} >
        { props.children }
    </Box>
}

export default Section;