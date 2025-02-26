import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export default function useGetCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customersCollectionRef = collection(db, "customers");
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const data = await getDocs(customersCollectionRef);

        const filteredData: Customer[] = data.docs.map((doc) => {
          const customer = doc.data();

          return {
            id: doc.id,
            brand: customer.brand,
            createdAt: customer.createdAt,
            dateOfTehnoTest: customer.dateOfTehnoTest,
            firstName: customer.firstName,
            model: customer.model,
            phone: customer.phone,
            regNumber: customer.regNumber,
            status: customer.status,
          };
        });

        setCustomers(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getCustomer();
  }, []);
  return customers;
}
