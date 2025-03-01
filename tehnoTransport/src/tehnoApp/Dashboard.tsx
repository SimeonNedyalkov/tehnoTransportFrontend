import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import Spinner from "../loaders/Spinner";
import useGetCustomer from "../hooks/useGetCustomer";

export default function Dashboard() {
  const customers = useGetCustomer();
  const [customersState, setCustomersState] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState({
    upcoming: 0,
    dueSoon: 0,
    overdue: 0,
  });

  useEffect(() => {
    const getCustomer = async () => {
      setLoading(true);
      try {
        let upcoming = 0;
        let dueSoon = 0;
        let overdue = 0;
        const filteredData: Customer[] = customers.map((customer) => {
          if (customer.status === "Upcoming") {
            upcoming += 1;
          } else if (customer.status === "Due Soon") {
            dueSoon += 1;
          } else if (customer.status === "Overdue") {
            overdue += 1;
          }
          return {
            ...customer,
          };
        });
        setStatusCounts({ upcoming, dueSoon, overdue });
        setCustomersState(filteredData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching customer data.");
        setLoading(false);
      }
    };
    getCustomer();
  }, [customers]);

  if (loading) {
    return (
      <div className="dashboard loading-spinner">
        <div>Loading...</div>
        {/* Add your spinner component here */}
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        An error occurred while fetching data. Please login or try again later.
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Customer List:</h1>
      <ul>
        {/* {customers.map((customer) => (
          <li key={customer.id}>
            {customer.firstName} - {customer.status}
          </li>
        ))} */}
        <p className="upcoming" aria-live="polite">
          Upcoming: {statusCounts.upcoming}
        </p>
        <p className="dueSoon" aria-live="polite">
          Due Soon: {statusCounts.dueSoon}
        </p>
        <p className="overdue" aria-live="polite">
          Overdue: {statusCounts.overdue}
        </p>
      </ul>
    </div>
  );
}
