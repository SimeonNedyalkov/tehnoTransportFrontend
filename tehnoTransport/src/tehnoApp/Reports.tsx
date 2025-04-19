import {
  Stack,
  Heading,
  Table,
  HStack,
  Checkbox,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";
import { SnackbarCloseReason } from "@mui/material/Snackbar/Snackbar";
import CarLoader from "../loaders/CarLoader";
import API from "../crud/API";
import { BicepsFlexed } from "lucide-react";
import { useTranslation } from "react-i18next";
type ReposrtsProps = {
  DATA: Customer[];
};
export default function Reports({ DATA }: ReposrtsProps) {
  const [data, setData] = useState<Customer[]>([]);
  const [values, setValues] = useState<Customer[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { t } = useTranslation();

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
    const allDueSoon = data.filter(
      (x) => x?.status === "Due Soon" && x?.isSentToApp != true
    );
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
    const checked = values.filter((x) => x.checked === true);
    console.log(checked);
    try {
      if (checked.length !== 0) {
        checked.map(async (c) => {
          const customerToUpdate = { ...c, isSentToApp: true };
          await API.updateCustomer(c.id, customerToUpdate);
          setData((prevValues) =>
            prevValues.map((value) =>
              value.id === c.id ? { ...value, isSentToApp: true } : value
            )
          );
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
  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);
  return (
    <>
      {loaded ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100vh"
        >
          <CarLoader />
        </Flex>
      ) : (
        <>
          {values.length === 0 ? (
            <Stack
              align="center"
              justify="center"
              h="full"
              textAlign="center"
              borderRadius="lg"
              boxShadow="md"
              p={8}
            >
              <Heading size="lg" color="teal.500" mb={4}>
                <HStack>
                  <BicepsFlexed />
                  {t("noCust")}
                  <BicepsFlexed />
                </HStack>
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                mb={6}
                dangerouslySetInnerHTML={{ __html: t("noCust1") }}
              ></Text>
            </Stack>
          ) : (
            <Stack width="full" gap="5" mt="10rem" pl="1rem" pr="1rem">
              <Stack align="flex-end">
                <HStack
                  justifyContent="space-between"
                  w="100%"
                  paddingBottom="1rem"
                >
                  <Heading size="xl" marginLeft="4rem">
                    {t("name")}
                  </Heading>

                  <Checkbox.Root
                    colorPalette="cyan"
                    marginRight="4rem"
                    checked={indeterminate ? "indeterminate" : allChecked}
                    onCheckedChange={(e) => {
                      setValues((current) =>
                        current.map((value) => ({
                          ...value,
                          checked: !!e.checked,
                        }))
                      );
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label>{t("selectAll")}</Checkbox.Label>
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
                      <Table.ColumnHeader>
                        {t("tHeaderFirstName")}
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>
                        {t("tHeaderRegNumb")}
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>
                        {t("tHeaderBrand")}
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>
                        {t("tHeaderModel")}
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>
                        {t("tHeaderPhoneNumber")}
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>
                        {t("tHeaderLastTehnoTest")}
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>
                        {t("tPeopleToSendSms")}
                      </Table.ColumnHeader>
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
                    <PaginationPrevTrigger color={isDark ? "gray" : "black"} />
                    <PaginationItems color={isDark ? "gray" : "black"} />
                    <PaginationNextTrigger color={isDark ? "gray" : "black"} />
                  </HStack>
                  <Button onClick={handleSendToApp}>{t("sendToAppBTN")}</Button>
                </HStack>
              </PaginationRoot>
            </Stack>
          )}
        </>
      )}
    </>
  );
}
