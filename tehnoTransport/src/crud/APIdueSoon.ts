import { Timestamp } from "firebase/firestore";
import NewCustomer from "../interfaces/newCustomer";

function getAuthTokenFromCookies(): string | null {
  const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
}

const createCustomer = async (customer: NewCustomer) => {
  const DBURL = "http://localhost:3000/due-soon-customers/";
  const authToken = getAuthTokenFromCookies();
  if (customer.dateOfTehnoTest) {
    const newDate = new Date(String(customer.dateOfTehnoTest));
    customer.dateOfTehnoTest = Timestamp.fromDate(newDate);
  }
  console.log(customer.dateOfTehnoTest);

  try {
    const response = await fetch(DBURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      console.log("Create customer failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating customer data:", error);
  }
};
const deleteCustomer = async (id: string) => {
  const DBURL = "http://localhost:3000/due-soon-customers/";
  const authToken = getAuthTokenFromCookies();
  try {
    const response = await fetch(DBURL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    });
    if (!response.ok && id != "") {
      console.log("Delete failed");
    }

    return response;
  } catch (error) {
    console.error("Error updating customer data:", error);
  }
};

async function findAll() {
  const DBURL = "http://localhost:3000/due-soon-customers/";
  const authToken = getAuthTokenFromCookies();
  try {
    const response = await fetch(DBURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log("Fetch all failed");
  }
}

const APIdueSoon = { createCustomer, deleteCustomer, findAll };

export default APIdueSoon;
