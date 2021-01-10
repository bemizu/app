import {
    Box, 
} from "@chakra-ui/react";

export default ( props ) => (
    <Box maxWidth="1200px" px={ 5 } margin="0 auto">

        { props.children }
    </Box>
)