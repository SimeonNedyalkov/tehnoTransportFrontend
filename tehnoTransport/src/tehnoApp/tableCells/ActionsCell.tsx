import { Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CellPropsInterface from "../../interfaces/CellPropsInterface";
import { Timestamp } from "firebase/firestore";
import { CiViewTable } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "../../components/ui/tooltip";
import API from "../../crud/API";
import Customer from "../../interfaces/CustomerInterface";
import daysRemainingAndStatusCalc from "../../tools/daysRemainingAndStatusCalc";
import timestampToDateStringConverter from "../../tools/DateOrTimestampConverter";

export default function ActionsCell({
  getValue,
  row,
  column,
  table,
}: CellPropsInterface) {
  const [customer, setCustomer] = useState<any>({});
  const [tableState, setTableState] = useState(false);

  const handleCreate = async (rowIndex: number) => {
    const { id, ...customer } = row.original;

    try {
      const updatedCustomer = await API.createCustomer(customer);
      // const date = new Date(customer.dateOfTehnoTest.seconds * 1000);
      // const localDate = new Date(
      //   date.getTime() - date.getTimezoneOffset() * 60000
      // );
      // const newdate = localDate.toISOString().split("T")[0];
      // updatedCustomer.dateOfTehnoTest = newdate;
      // const testDate = new Date(updatedCustomer.dateOfTehnoTest.seconds * 1000);

      const testDate = new Date(
        updatedCustomer.dateOfTehnoTest._seconds * 1000
      );

      const timestamp = Timestamp.fromDate(testDate);

      updatedCustomer.daysRemaining =
        daysRemainingAndStatusCalc.calculateDaysRemaining(timestamp);
      updatedCustomer.status = daysRemainingAndStatusCalc.getStatus(
        updatedCustomer.daysRemaining
      );
      updatedCustomer.dateOfTehnoTest = timestampToDateStringConverter(
        updatedCustomer.dateOfTehnoTest
      )
        .toISOString()
        .split("T")[0];
      setCustomer(updatedCustomer);

      Object.keys(updatedCustomer).forEach((key) => {
        if (key === "dateOfTehnoTest") {
          table.options.meta.updateData(
            row.index,
            key,
            updatedCustomer["dateOfTehnoTest"]
          );
        }
        table.options.meta.updateData(row.index, key, updatedCustomer[key]);
      });
      return updatedCustomer;
    } catch (error) {
      console.error("Error create customer data:", error);
    }
  };

  const handleUpdate = async (rowIndex: number) => {
    const customer = row.original;
    try {
      console.log(customer);
      const updatedCustomer = await API.updateCustomer(customer.id, customer);
      const date = new Date(customer.dateOfTehnoTest.seconds * 1000);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const newdate = localDate.toISOString().split("T")[0];
      updatedCustomer.dateOfTehnoTest = newdate;
      const testDate = new Date(updatedCustomer.dateOfTehnoTest);
      const timestamp = Timestamp.fromDate(testDate);
      updatedCustomer.daysRemaining =
        daysRemainingAndStatusCalc.calculateDaysRemaining(timestamp);
      updatedCustomer.status = daysRemainingAndStatusCalc.getStatus(
        updatedCustomer.daysRemaining
      );

      setCustomer(updatedCustomer);
      Object.keys(updatedCustomer).forEach((key) => {
        table.options.meta.updateData(row.index, key, updatedCustomer[key]);
      });
      return updatedCustomer;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    const customer = row.original;
    try {
      const deletedCustomer = await API.deleteCustomer(customer.id);
      setCustomer(deletedCustomer);
      table.options.meta.removeRow(row.index);
      return deletedCustomer;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  return (
    <Box>
      <Tooltip showArrow content="Add" positioning={{ placement: "top-end" }}>
        <Button
          size="md"
          onClick={() => handleCreate(row.index)}
          background="transparent"
          padding="8px"
        >
          <CiViewTable color="blue" size="8" />
        </Button>
      </Tooltip>
      <Tooltip
        showArrow
        content="Update"
        positioning={{ placement: "top-end" }}
      >
        <Button
          size="sm"
          colorScheme="green"
          bg="transparent"
          onClick={() => handleUpdate(row.index)}
          padding="8px"
        >
          <FiEdit color="green" size="8" />
        </Button>
      </Tooltip>
      <Tooltip
        showArrow
        content="Delete"
        positioning={{ placement: "top-end" }}
      >
        <Button
          size="sm"
          colorScheme="red"
          bg="transparent"
          onClick={() => handleDelete(row.index)}
          padding="8px"
        >
          <FaTrashAlt color="red" size="8" />
        </Button>
      </Tooltip>
    </Box>
  );
}
