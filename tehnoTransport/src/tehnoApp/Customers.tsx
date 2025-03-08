import Table from "./Table";
import { Box, Heading } from "@chakra-ui/react";

export default function Customers() {
  return (
    <Box
      maxW={1000}
      mx="auto"
      px={6}
      fontSize="sm"
      padding="0"
      margin="6"
      pt="24"
    >
      <Heading mb={10}>Tehno Transport</Heading>
      <Table />
    </Box>
  );
}
