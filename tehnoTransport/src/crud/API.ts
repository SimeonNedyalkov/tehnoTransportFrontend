import NewCustomer from "../interfaces/NewCustomerInterface";

function getAuthTokenFromCookies(): string | null {
  const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
}

const updateCustomer = async (id: string, customer: NewCustomer) => {
  const DBURL = "https://tehno-transport-b.onrender.com/customers/";
  const authToken = getAuthTokenFromCookies();

  try {
    const response = await fetch(DBURL + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
      body: JSON.stringify(customer),
    });
    if (!response.ok && customer.brand != "") {
      console.log("Error Update failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating customer data:", error);
  }
};

const createCustomer = async (customer: NewCustomer) => {
  const DBURL = "https://tehno-transport-b.onrender.com/customers/";
  const authToken = getAuthTokenFromCookies();

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
  const DBURL = "https://tehno-transport-b.onrender.com/customers/";
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

const API = { updateCustomer, createCustomer, deleteCustomer };

export default API;
