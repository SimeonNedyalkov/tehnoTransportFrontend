import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { useNavigate } from "react-router-dom";

export default function useGetCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const DBURL = "http://localhost:3000/customers";
  const navigation = useNavigate();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await fetch(DBURL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          navigation("/");
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();

        const filteredData: Customer[] = data.map((customer: any) => {
          return {
            id: customer.id,
            brand: customer.brand,
            createdAt: customer.createdAt,
            dateOfTehnoTest: new Date(customer.dateOfTehnoTest.seconds * 1000)
              .toISOString()
              .split("T")[0],
            firstName: customer.firstName,
            model: customer.model,
            phone: String(customer.phone),
            regNumber: customer.regNumber,
            status: customer.status,
          };
        });

        setCustomers(filteredData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    getCustomer();
  }, []);

  return customers;
}
