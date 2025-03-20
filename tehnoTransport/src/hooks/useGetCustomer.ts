import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import daysRemainingAndStatusCalc from "../tools/daysRemainingAndStatusCalc";
import refreshAuthToken from "../tools/refreshToken";

export default function useGetCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const DBURL = "http://localhost:3000/customers";
  const navigation = useNavigate();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        let response = await fetch(DBURL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          try {
            const refreshedData = await refreshAuthToken();
            if (!response.ok) {
              console.error("Failed to fetch data");
              if (refreshedData) {
                console.log("Retrying request with refreshed token...");
                response = await fetch(DBURL, {
                  method: "GET",
                  credentials: "include",
                });
                console.log(response);
              }
            } else {
              const data = await refreshedData.json();
              console.log("API Data:", data);
            }
          } catch (error) {}
          navigation("/");
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();

        const filteredData: Customer[] = data.map((customer: any) => {
          const date = new Date(customer.dateOfTehnoTest.seconds * 1000);
          const localDate = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          );
          let testDate: Date;
          if (customer.dateOfTehnoTest instanceof Timestamp) {
            // If it's a Firebase Timestamp
            testDate = customer.dateOfTehnoTest.toDate();
          } else if (customer.dateOfTehnoTest instanceof Date) {
            // If it's already a Date object
            testDate = customer.dateOfTehnoTest;
          } else {
            // If it's an object with seconds and nanoseconds (common in Firestore documents)
            testDate = new Date(customer.dateOfTehnoTest.seconds * 1000);
          }
          const timestamp = Timestamp.fromDate(testDate);
          const daysRemaining =
            daysRemainingAndStatusCalc.calculateDaysRemaining(timestamp);
          const status = daysRemainingAndStatusCalc.getStatus(daysRemaining);
          return {
            id: customer.id,
            brand: customer.brand,
            createdAt: customer.createdAt,
            dateOfTehnoTest: localDate.toISOString().split("T")[0],
            firstName: customer.firstName,
            model: customer.model,
            phone: String(customer.phone),
            regNumber: customer.regNumber,
            status: status,
            daysRemaining: daysRemaining,
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
