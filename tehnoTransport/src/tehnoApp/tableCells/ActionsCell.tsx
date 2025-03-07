import { Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CellPropsInterface from "../../interfaces/CellPropsInterface";
import { Timestamp } from "firebase/firestore";
import { CiViewTable } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "../../components/ui/tooltip";

export default function ActionsCell({
  getValue,
  row,
  column,
  table,
}: CellPropsInterface) {
  const [customer, setCustomer] = useState<any>({});
  const [tableState, setTableState] = useState(false);

  function getAuthTokenFromCookies(): string | null {
    const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : null;
  }

  const handleCreate = async (rowIndex: number) => {
    const DBURL = "http://localhost:3000/customers/";
    const authToken = getAuthTokenFromCookies();
    const { id, ...customer } = row.original;

    // Ensure that the conversion to `Timestamp` happens correctly
    if (customer.dateOfTehnoTest) {
      const date = new Date(customer.dateOfTehnoTest);

      // Check if it's a valid date before converting
      if (!isNaN(date.getTime())) {
        customer.dateOfTehnoTest = Timestamp.fromDate(date);
      } else {
        console.error("Invalid date format:", customer.dateOfTehnoTest);
      }
    } else {
      console.error("No date provided:", customer.dateOfTehnoTest);
    }

    try {
      const response = await fetch(DBURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify(customer),
      });
      if (!response.ok) {
        console.log("Create customer failed");
      }
      setCustomer(response);
      const updatedCustomer = await response.json();
      Object.keys(updatedCustomer).forEach((key) => {
        table.options.meta.updateData(row.index, key, updatedCustomer[key]);
      });
      return response;
    } catch (error) {
      console.error("Error create customer data:", error);
    }
  };

  const handleUpdate = async (rowIndex: number) => {
    const DBURL = "http://localhost:3000/customers/";
    const authToken = getAuthTokenFromCookies();
    const customer = row.original;
    try {
      const response = await fetch(DBURL + customer.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify(customer),
      });
      if (!response.ok && customer.brand != "") {
        console.log("Update failed");
      }
      setCustomer(response);
      const updatedCustomer = await response.json();
      Object.keys(updatedCustomer).forEach((key) => {
        table.options.meta.updateData(row.index, key, updatedCustomer[key]);
      });
      return response;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    const DBURL = "http://localhost:3000/customers/";
    const authToken = getAuthTokenFromCookies();
    const customer = row.original;
    try {
      const response = await fetch(DBURL + customer.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });
      if (!response.ok && customer.brand != "") {
        console.log("Delete failed");
      }
      setCustomer(response);
      table.options.meta.removeRow(row.index);
      return response;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };
  const fetchCustomers = async () => {
    const DBURL = "http://localhost:3000/customers/";
    const authToken = getAuthTokenFromCookies();
    try {
      const response = await fetch(DBURL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCustomer(data); // Set the customer data after fetch
      } else {
        console.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [tableState]);
  return (
    <Box>
      <Tooltip showArrow content="Add" positioning={{ placement: "top-end" }}>
        <Button
          size="md"
          onClick={() => handleCreate(row.index)}
          background="transparent"
          padding="8px"
        >
          <CiViewTable color="blue" size="md" />
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
          <FiEdit color="green" />
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
          <FaTrashAlt color="red" />
        </Button>
      </Tooltip>
    </Box>
  );
}
