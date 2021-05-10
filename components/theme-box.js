import {
    Box,
} from "@chakra-ui/react";

import theme from "../public/theme";

function ThemeBox ({ children }) {
    return (
        <Box rounded={["none", "none", "md"]}
        shadow={["none", "none", "lg"]}
        p={[5, 5, 6]}
        py={[5, 5, 6]}
        bg={theme.white}
        mb={[0, 0, 5]}>
            { children }
        </Box>
    )
}
export default ThemeBox;