
import {
    Box
} from "@chakra-ui/react"

import theme from "../public/theme";

export default () => {
    return  <Box bg={ theme.blue } height={["70px", "70px",  "80px"]} position="fixed" width="100vw" zIndex="600" top={["none", "none", "0"]} bottom={["0", "0", "none"]}>

    </Box>

}