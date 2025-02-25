import { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { getDocs, collection } from "firebase/firestore";
import Customer from "../interfaces/CustomerInterface";

export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customersCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getShard = async () => {
      try {
        const data = await getDocs(customersCollectionRef);
        const filteredData: any[] = data.docs.map((doc) => {
          const customer = doc.data();
          return {
            ...customer,
            id: doc.id,
          };
        });
        console.log(filteredData);
        setCustomers(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getShard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.firstName}>
            {customer.firstName} - {customer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
