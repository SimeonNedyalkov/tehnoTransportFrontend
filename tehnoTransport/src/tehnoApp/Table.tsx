import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useGetCustomer from "../hooks/useGetCustomer";
import { Box, ButtonGroup, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import EditableCell from "./tableCells/EditableCell";
import StatusCell from "./tableCells/StatusCell";
import DateCell from "./tableCells/DateCell";
import Filters from "./tableCells/Filters";
import FilterPopover from "./tableCells/FilterPopover";
import SortIcon from "../components/ui/Icons/SortIcon";
import { Button } from "@chakra-ui/react";
import NewCustomer from "../interfaces/newCustomer";
import useUpdateCustomer from "../hooks/useUpdateCustomer";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: EditableCell,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: EditableCell,
  },
  {
    accessorKey: "regNumber",
    header: "Registration Number",
    cell: EditableCell,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: EditableCell,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: EditableCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "dateOfTehnoTest",
    header: "Last tehno test",
    cell: DateCell,
  },
];
export default function Table() {
  const DATA = useGetCustomer();
  const [data, setData] = useState<NewCustomer[]>(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    setData(DATA);
  }, [DATA]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });
  console.log(data);
  const addNewRow = () => {
    const newRow: NewCustomer = {
      id: "",
      brand: "",
      model: "",
      regNumber: "",
      firstName: "",
      phone: 359,
      status: "",
      dateOfTehnoTest: new Date(),
    };
    setData((prev) => [...prev, newRow]);
  };
  function getAuthTokenFromCookies(): string | null {
    const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : null;
  }

  // Usage

  const updateCustomers = async (id: string, customer: NewCustomer) => {
    const DBURL = "http://localhost:3000/customers/";
    const authToken = getAuthTokenFromCookies();

    try {
      const response = await fetch(DBURL + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify(customer),
      });
      console.log(customer);
      // if (!response.ok) {
      //   navigation("/");
      //   throw new Error("Failed to update customer data");
      // }

      return response;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };
  const updateAll = async () => {
    for (const row of table.getRowModel().flatRows) {
      const singleRow = row.original;
      console.log(singleRow.id);
      await updateCustomers(singleRow.id, singleRow); // Perform async update for each row
    }
  };
  return (
    <Box>
      <HStack justifyContent="space-between" w="100%" mb={6}>
        <HStack>
          <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <FilterPopover
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </HStack>
        <Button size="sm" onClick={updateAll}>
          Save all
        </Button>
      </HStack>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                <>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <Icon
                      size="sm"
                      mx={3}
                      fontSize={14}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <SortIcon />
                    </Icon>
                  )}
                  {
                    {
                      asc: "⇧",
                      desc: "⇩",
                    }[header.column.getIsSorted() as "asc" | "desc"]
                  }
                </>
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer = ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <br />
      <HStack justifyContent="space-between" w="100%" mt={4}>
        <VStack>
          <Text mb={2}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Text>
          <ButtonGroup size="sm" variant="outline">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
          </ButtonGroup>
        </VStack>
        <Button onClick={addNewRow}>Add new</Button>
      </HStack>
    </Box>
  );
}
