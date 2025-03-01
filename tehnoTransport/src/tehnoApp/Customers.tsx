import useGetCustomer from "../hooks/useGetCustomer";
import Table from "./Table";
import { Box, Heading } from "@chakra-ui/react";

export default function Customers() {
  const customers = useGetCustomer();

  return (
    <Box maxW={1000} mx="auto" px={6} pt="24" fontSize="sm">
      <Heading mb={10}>Tehno Transport</Heading>
      <Table />
    </Box>
  );
}
