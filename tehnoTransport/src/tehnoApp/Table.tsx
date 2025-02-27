import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useGetCustomer from "../hooks/useGetCustomer";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import EditableCell from "./tableCells/EditableCell";
import StatusCell from "./tableCells/StatusCell";
const columns = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: EditableCell,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "regNumber",
    header: "Registration Number",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "dateOfTehnoTest",
    header: "Last tehno test",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
];
export default function Table() {
  const DATA = useGetCustomer();
  const [data, setData] = useState<Customer[]>(DATA);
  useEffect(() => {
    setData(DATA);
  }, [DATA]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) =>
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
  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
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
      </Box>
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
  );
}
