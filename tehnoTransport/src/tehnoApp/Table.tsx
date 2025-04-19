import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  ButtonGroup,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import EditableCell from "./tableCells/EditableCell";
import StatusCell from "./tableCells/StatusCell";
import DateCell from "./tableCells/DateCell";
import Filters from "./tableCells/Filters";
import FilterPopover from "./tableCells/FilterPopover";
import SortIcon from "../components/ui/Icons/SortIcon";
import NewCustomer from "../interfaces/NewCustomerInterface";
import API from "../crud/API";
import { useNavigate } from "react-router-dom";
import ActionsCell from "./tableCells/ActionsCell";
import { Timestamp } from "firebase/firestore";
import daysRemainingAndStatusCalc from "../tools/daysRemainingAndStatusCalc";
import timestampToDateStringConverter from "../tools/DateOrTimestampConverter";
import { useTranslation } from "react-i18next";
type CustomersProps = {
  DATA: Customer[];
};
export default function Table({ DATA }: CustomersProps) {
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        accessorKey: "brand",
        header: t("tHeaderBrand"),
        cell: EditableCell,
      },
      {
        accessorKey: "model",
        header: t("tHeaderModel"),
        cell: EditableCell,
        size: 100,
      },
      {
        accessorKey: "regNumber",
        header: t("tHeaderRegNumb"),
        cell: EditableCell,
      },
      {
        accessorKey: "firstName",
        header: t("tHeaderFirstName"),
        cell: EditableCell,
      },
      {
        accessorKey: "phone",
        header: t("tHeaderPhoneNumber"),
        cell: EditableCell,
      },
      {
        accessorKey: "status",
        header: t("tHeaderStatus"),
        cell: StatusCell,
      },
      {
        accessorKey: "dateOfLastTehnoTest",
        header: t("tHeaderLastTehnoTest"),
        cell: DateCell,
      },
      {
        id: "actions",
        header: t("tHeaderActions"),
        cell: ActionsCell,
        size: 120,
      },
    ],
    []
  );
  const [data, setData] = useState<NewCustomer[]>(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigation = useNavigate();
  useEffect(() => {
    setData(DATA);
  }, [DATA]);
  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);
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
      phone: "",
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
              newCustomer.dateOfNextTehnoTest
            )}`
          );
          const testDate = new Date(
            newCustomer.dateOfNextTehnoTest._seconds * 1000
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
            {t("page")} {table.getState().pagination.pageIndex + 1} {t("of")}{" "}
            {table.getPageCount()}
          </Text>
          <ButtonGroup size="sm" variant="outline">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              colorPalette={isDark ? "gray" : ""}
            >
              {"<"}
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              colorPalette={isDark ? "gray" : ""}
            >
              {">"}
            </Button>
          </ButtonGroup>
        </VStack>
        <Button
          onClick={addNewRow}
          colorPalette={isDark ? "gray" : ""}
          variant="outline"
        >
          {t("addNewBTN")}
        </Button>
      </HStack>
    </Box>
  );
}
