import useGetCustomer from "../hooks/useGetCustomer";
import Table from "./Table";
import { Box, Heading } from "@chakra-ui/react";

export default function Customers() {
  const customers = useGetCustomer();

  return (
    // <div className="dashboard">
    //   <h1 className="text-xl font-bold mb-4">All Customers:</h1>

    //   <table className="min-w-full border-collapse table-auto">
    //     <thead>
    //       <tr>
    //         <th className="border-b px-4 py-2 text-left">Brand</th>
    //         <th className="border-b px-4 py-2 text-left">Model</th>
    //         <th className="border-b px-4 py-2 text-left">Reg Number</th>
    //         <th className="border-b px-4 py-2 text-left">First Name</th>
    //         <th className="border-b px-4 py-2 text-left">Phone</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {customers.map((customer) => (
    //         <tr
    //           key={customer.id}
    //           className="odd:bg-gray-100 dark:odd:bg-gray-800"
    //         >
    //           <td className="border-b px-4 py-2">{customer.brand}</td>
    //           <td className="border-b px-4 py-2">{customer.model}</td>
    //           <td className="border-b px-4 py-2">{customer.regNumber}</td>
    //           <td className="border-b px-4 py-2">{customer.firstName}</td>
    //           <td className="border-b px-4 py-2">{customer.phone}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <Box maxW={1000} mx="auto" px={6} pt="24" fontSize="sm">
      <Heading mb={10}>Tehno Transport</Heading>
      <Table />
    </Box>
  );
}
