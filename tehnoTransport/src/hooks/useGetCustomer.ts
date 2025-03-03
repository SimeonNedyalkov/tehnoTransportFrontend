import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { useNavigate } from "react-router-dom";

export default function useGetCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const DBURL = "http://localhost:3000/customers";
  const navigation = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login...");
      navigation("/");
      return;
    }

    const getCustomer = async () => {
      try {
        const response = await fetch(DBURL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const filteredData: Customer[] = data.map((customer: any) => {
          const seconds = customer.dateOfTehnoTest._seconds;
          const nanoseconds = customer.dateOfTehnoTest._nanoseconds;

          const date = new Date(seconds * 1000);
          const adjustedDate = new Date(date.getTime() + nanoseconds / 1000000);

          console.log(adjustedDate.toISOString());
          return {
            id: customer.id,
            brand: customer.brand,
            createdAt: customer.createdAt,
            dateOfTehnoTest: adjustedDate.toISOString(),
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
