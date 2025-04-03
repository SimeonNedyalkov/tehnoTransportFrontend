import {
  Stack,
  Heading,
  Table,
  HStack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import useGetCustomer from "../hooks/useGetCustomer";
import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { Timestamp } from "firebase/firestore";
// import APIdueSoon from "../crud/APIdueSoon";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";
import { SnackbarCloseReason } from "@mui/material/Snackbar/Snackbar";
import CarLoader from "../loaders/CarLoader";
import API from "../crud/API";

// interface Customer2 {
//   id: string;
//   brand: string | "Unknown Brand";
//   createdAt?: Timestamp;
//   dateOfLastTehnoTest: Timestamp | Date;
//   firstName: string;
//   model: string;
//   phone: string;
//   regNumber: string;
//   status?: string;
//   daysRemaining?: number;
//   checked?: boolean;
// }
export default function Reports() {
  const DATA = useGetCustomer();

  const [data, setData] = useState<Customer[]>([]);
  const [values, setValues] = useState<Customer[]>([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (isSuccess === true) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
  }, [isSuccess, refreshKey]);

  useEffect(() => {
    const allDueSoon = data.filter((x) => x?.status === "Due Soon");
    const allDueSoon2 = allDueSoon.map((customer) => ({
      ...customer,
      checked: false,
    }));
    setValues(allDueSoon2);
  }, [data]);
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((item, index) => (
    <Checkbox.Root
      ms="6"
      key={item.id}
      colorPalette="cyan"
      checked={item.checked}
      onCheckedChange={(e) => {
        setValues((current) => {
          const newValues = [...current];
          newValues[index] = { ...newValues[index], checked: !!e.checked };
          return newValues;
        });
      }}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>{item.phone}</Checkbox.Label>
    </Checkbox.Root>
  ));

  useEffect(() => {
    if (DATA.length !== data.length) {
      setData(DATA);
    }
  }, [DATA]);

  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 2000);
  }, []);

  const handleSendToApp = async () => {
    DATA.map(async (c) => {
      const customerToUpdate = { ...c, isSentToApp: false };
      const response = await API.updateCustomer(c.id, customerToUpdate);
    });
    const checked = values.filter((x) => x.checked === true);
    console.log(checked);
    try {
      if (checked.length !== 0) {
        checked.map(async (c) => {
          const customerToUpdate = { ...c, isSentToApp: true };
          await API.updateCustomer(c.id, customerToUpdate);

          setIsSuccess(true);
          setError(false);
        });
      } else {
        setIsSuccess(false);
        setError(true);
      }
    } catch (error) {
      setIsSuccess(false);
      setError(true);
      console.error("Error creating customer data:", error);
    }

    setOpen(true);
  };

  return (
    <>
      {loaded ? (
        <CarLoader />
      ) : (
        <Stack width="full" gap="5" mt="10rem" pl="1rem" pr="1rem">
          <Stack align="flex-end">
            <HStack
              justifyContent="space-between"
              w="100%"
              paddingBottom="1rem"
            >
              <Heading size="xl" marginLeft="4rem">
                Tehno Transport
              </Heading>
              <Checkbox.Root
                colorPalette="cyan"
                marginRight="4rem"
                checked={indeterminate ? "indeterminate" : allChecked}
                onCheckedChange={(e) => {
                  setValues((current) =>
                    current.map((value) => ({ ...value, checked: !!e.checked }))
                  );
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Select All</Checkbox.Label>
              </Checkbox.Root>
            </HStack>
            {isSuccess ? (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  This is a success !!!
                </Alert>
              </Snackbar>
            ) : isError ? (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  There was an error !!!
                </Alert>
              </Snackbar>
            ) : (
              <></>
            )}
            <Table.Root size="sm" variant="outline" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Reg number</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Model</Table.ColumnHeader>
                  <Table.ColumnHeader>Phone</Table.ColumnHeader>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>People to send sms</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {values.map((customer) =>
                  customer.status === "Due Soon" ? (
                    <Table.Row key={customer.id}>
                      <Table.Cell>{customer.firstName}</Table.Cell>
                      <Table.Cell>{customer.regNumber}</Table.Cell>
                      <Table.Cell>{customer.brand}</Table.Cell>
                      <Table.Cell>{customer.model}</Table.Cell>
                      <Table.Cell>{customer.phone}</Table.Cell>
                      <Table.Cell>
                        {String(customer.dateOfLastTehnoTest)}
                      </Table.Cell>
                      <Table.Cell>
                        {items.filter((x) => x.key === customer.id)}
                      </Table.Cell>
                      {/* <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control
                    sx={{
                      bg: "white",
                      borderColor: "black",
                      _checked: { bg: "black", borderColor: "black" },
                      _hover: { bg: "gray.200" },
                    }}
                  />
                </Checkbox.Root> */}
                    </Table.Row>
                  ) : (
                    <></>
                  )
                )}
              </Table.Body>
            </Table.Root>
          </Stack>

          <PaginationRoot count={values.length} pageSize={5} page={1}>
            <HStack justifyContent="space-between">
              <HStack wrap="wrap">
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
              <Button onClick={handleSendToApp}>Send to app</Button>
            </HStack>
          </PaginationRoot>
        </Stack>
      )}
    </>
  );
}
