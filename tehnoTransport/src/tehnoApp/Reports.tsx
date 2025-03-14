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

interface Customer2 {
  id: string;
  brand: string | "Unknown Brand";
  createdAt?: Timestamp | Date;
  dateOfTehnoTest: Timestamp | Date;
  firstName: string;
  model: string;
  phone: number;
  regNumber: string;
  status?: string;
  daysRemaining?: number;
  checked?: boolean;
}
export default function Reports() {
  const DATA = useGetCustomer();
  const [data, setData] = useState<Customer[]>([]);
  const [values, setValues] = useState<Customer2[]>([]);
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

  console.log(values);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (DATA.length !== data.length) {
      setData(DATA);
    }
  }, [DATA]);
  console.log(items);

  const handleSendToApp = () => {
    return console.log("hello");
  };
  return (
    <Stack width="full" gap="5" mt="10rem">
      <Stack align="flex-end">
        <HStack justifyContent="space-between" w="100%" paddingBottom="1rem">
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
                  <Table.Cell>{String(customer.dateOfTehnoTest)}</Table.Cell>
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
  );
}
