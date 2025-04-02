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
import { useEffect, useMemo, useRef, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import EditableCell from "./tableCells/EditableCell";
import StatusCell from "./tableCells/StatusCell";
import DateCell from "./tableCells/DateCell";
import Filters from "./tableCells/Filters";
import FilterPopover from "./tableCells/FilterPopover";
import SortIcon from "../components/ui/Icons/SortIcon";
import { Button } from "@chakra-ui/react";
import NewCustomer from "../interfaces/NewCustomerInterface";
import API from "../crud/API";
import { useNavigate } from "react-router-dom";
import ActionsCell from "./tableCells/ActionsCell";
import { Timestamp } from "firebase/firestore";
import React from "react";
import daysRemainingAndStatusCalc from "../tools/daysRemainingAndStatusCalc";
import timestampToDateStringConverter from "../tools/DateOrTimestampConverter";
import CarLoader from "../loaders/CarLoader";

export default function Table() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "brand",
        header: "Brand",
        cell: EditableCell,
      },
      {
        accessorKey: "model",
        header: "Model",
        cell: EditableCell,
        size: 100,
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
        accessorKey: "dateOfLastTehnoTest",
        header: "Last tehno test",
        cell: DateCell,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ActionsCell,
        size: 120,
      },
    ],
    []
  );
  const DATA = useGetCustomer();
  const [data, setData] = useState<NewCustomer[]>(DATA);
  const [refreshData, setRefreshData] = useState(false);

  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigation = useNavigate();
  useEffect(() => {
    setData(DATA);
  }, [DATA]);
  console.log(data);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    autoResetExpanded: false,
    onPaginationChange: (newPagination) => {
      setPagination(newPagination);
    },
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
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: NewCustomer[]) =>
          old.filter((_row: NewCustomer, index: number) => index !== rowIndex);
        setData(setFilterFunc);
      },
    },
  });

  const addNewRow = () => {
    const newRow: NewCustomer = {
      id: "",
      brand: "",
      model: "",
      regNumber: "",
      firstName: "",
      phone: 359,
      dateOfLastTehnoTest: new Date().toISOString().split("T")[0],
    };
    setData((prev) => {
      const updatedData = [...prev, newRow];
      const totalRows = updatedData.length;
      const totalPages = Math.ceil(totalRows / pagination.pageSize);
      if (pagination.pageIndex >= totalPages - 1) {
        setPagination((prevState) => ({
          ...prevState,
          pageIndex: totalPages - 1,
        }));
      }
      return updatedData;
    });
  };

  const updateAll = async () => {
    const updatedData = [
      ...table.getRowModel().flatRows.map((row) => row.original),
    ];
    for (const customer of updatedData) {
      try {
        if (customer.id) {
          await API.updateCustomer(customer.id, customer);
        } else {
          const { id, ...newCustomerWithoutID } = customer;
          console.log(customer);
          const newCustomer = await API.createCustomer(newCustomerWithoutID);
          console.log(
            `NewCustomer date:${Object.entries(
              newCustomer.dateOfLastTehnoTest
            )}`
          );
          const testDate = new Date(
            newCustomer.dateOfLastTehnoTest._seconds * 1000
          );
          console.log(`Test date : ${testDate}`);
          const timestamp = Timestamp.fromDate(testDate);
          console.log(`Date to timestamp ${timestamp}`);
          newCustomer.daysRemaining =
            daysRemainingAndStatusCalc.calculateDaysRemaining(timestamp);
          newCustomer.status = daysRemainingAndStatusCalc.getStatus(
            newCustomer.daysRemaining
          );
          newCustomer.dateOfLastTehnoTest = timestampToDateStringConverter(
            newCustomer.dateOfLastTehnoTest
          )
            .toISOString()
            .split("T")[0];
          setData((prev) => {
            const indexOfAddedRow = prev.findIndex(
              (c) =>
                c.firstName === customer.firstName && c.phone === customer.phone
            );
            prev.splice(indexOfAddedRow, 1);
            const updatedData = [...prev, newCustomer];

            return updatedData;
          });
        }
      } catch (error) {
        console.error("Error saving customer:", error);
      }
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
        {/* <Button size="sm" onClick={() => setRefreshData((prev) => !prev)}>
          Refresh page
        </Button> */}
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
