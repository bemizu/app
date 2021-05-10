import { Box } from "@chakra-ui/react";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme

function MyQuill() {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["link"],
        [{ list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ],
    },
  });

  return (
    <Box
      bg="white"
      rounded="sm"
      defaultValue={""}
      // data-path="description"
      // onChange={update}
      ref={quillRef}
    />
  );
}

export default MyQuill;
