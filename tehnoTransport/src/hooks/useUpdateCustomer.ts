import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { useNavigate } from "react-router-dom";

export default function useUpdateCustomer(id: string, customer: Customer) {
  const [oldCustomer, setOldCustomer] = useState({});
  const DBURL = "https://tehno-transport-b.onrender.com/customers/";
  const navigation = useNavigate();

  useEffect((): any => {
    const updateCustomer = async (id: string, dataToUpdate: Customer) => {
      try {
        const response = await fetch(DBURL + id, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
          navigation("/");
          throw new Error("Failed to fetch customer data");
        }

        return dataToUpdate;
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    const newCustomer = updateCustomer(id, customer);
    setOldCustomer(newCustomer);
    return oldCustomer;
  }, [oldCustomer]);
}
