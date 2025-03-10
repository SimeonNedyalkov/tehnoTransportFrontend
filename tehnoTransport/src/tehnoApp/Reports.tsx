import { Stack, Heading, Table, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import useGetCustomer from "../hooks/useGetCustomer";
import Customer from "../interfaces/CustomerInterface";
import { useEffect, useState } from "react";

export default function Reports() {
  const DATA = useGetCustomer();
  const [data, setData] = useState<Customer[]>([]);
  useEffect(() => {
    if (DATA.length !== data.length) {
      setData(DATA);
    }
  }, [DATA]);
  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Products</Heading>
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Model</Table.ColumnHeader>
            <Table.ColumnHeader>Phone</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((customer) =>
            customer.status === "Due Soon" ? (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.firstName}</Table.Cell>
                <Table.Cell>{customer.brand}</Table.Cell>
                <Table.Cell>{customer.model}</Table.Cell>
                <Table.Cell>{customer.phone}</Table.Cell>
              </Table.Row>
            ) : (
              <></>
            )
          )}
        </Table.Body>
      </Table.Root>

      <PaginationRoot count={data.length} pageSize={5} page={1}>
        <HStack wrap="wrap">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Stack>
  );
}
