import useGetCustomer from "../hooks/useGetCustomer";
import Table from "./Table";
import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";

export default function Customers() {
  const [refreshData, setRefreshData] = useState(false);
  const customers = useGetCustomer(refreshData);

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
