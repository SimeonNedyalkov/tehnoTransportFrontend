import { useEffect, useState } from "react";
import Table from "./Table";
import { Box, Heading } from "@chakra-ui/react";
import CarLoader from "../loaders/CarLoader";

export default function Customers() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 2000);
  }, []);
  return (
    <>
      {loaded ? (
        <CarLoader />
      ) : (
        <Box
          maxW={1000}
          mx="auto"
          px={6}
          fontSize="sm"
          padding="0"
          margin="6"
          // pt="24"
        >
          <Heading mb={10}>Tehno Transport</Heading>
          <Table />
        </Box>
      )}
    </>
  );
}
