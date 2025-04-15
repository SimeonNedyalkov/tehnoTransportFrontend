import { useEffect, useState } from "react";
import Table from "./Table";
import { Box, Flex, Heading } from "@chakra-ui/react";
import CarLoader from "../loaders/CarLoader";
import { useTranslation } from "react-i18next";
import Customer from "../interfaces/CustomerInterface";
type CustomersProps = {
  DATA: Customer[];
};
export default function Customers({ DATA }: CustomersProps) {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 2000);
  }, []);
  return (
    <>
      {loaded ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100vh" // or any height that fits your design
        >
          <CarLoader />
        </Flex>
      ) : (
        <Box
          maxW={1000}
          mx="auto"
          px={6}
          fontSize="sm"
          padding="0"
          margin="6"
          marginBottom="0"
          // pt="24"
        >
          <Heading mb={10}>{t("name")}</Heading>
          <Table DATA={DATA} />
        </Box>
      )}
    </>
  );
}
