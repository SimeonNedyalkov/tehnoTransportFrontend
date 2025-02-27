import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useGetCustomer from "../hooks/useGetCustomer";
import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
const columns = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: (props: any) => <p>{props.getValue()}</p>,
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
  });
  console.log(data);
  return (
    <div className="table">
      {table.getHeaderGroups().map((headerGroup) => (
        <div className="headers" key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <div className="cell" key={header.id}>
              {header.column.columnDef.header}
            </div>
          ))}
        </div>
      ))}

      {table.getRowModel().rows.map((row) => (
        <div className="row" key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <div className="cell" key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
