import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { useNavigate } from "react-router-dom";

export default function useGetCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const DBURL = "http://localhost:3000/customers";
  const navigation = useNavigate();

  useEffect(() => {
    // Function to get a specific cookie value
    // const getCookie = (name: string) => {
    //   return Cookies.get(name);
    // };

    // const token = document.cookie.match("/authToken/gm");
    // console.log(token);
    // if (!token) {
    //   console.error("No token found in cookies, redirecting to login...");
    //   navigation("/");
    //   return;
    // }
    // const cookieValue = document.cookie.split("; ");
    // console.log(cookieValue);
    const getCustomer = async () => {
      try {
        const response = await fetch(DBURL, {
          method: "GET",
          credentials: "include", // Required to send cookies with requests
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

        if (!response.ok) {
          navigation("/");
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();

        const filteredData: Customer[] = data.map((customer: any) => {
          const seconds = customer.dateOfTehnoTest._seconds;
          const nanoseconds = customer.dateOfTehnoTest._nanoseconds;

          const date = new Date(seconds * 1000);
          const adjustedDate = new Date(date.getTime() + nanoseconds / 1000000);

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
