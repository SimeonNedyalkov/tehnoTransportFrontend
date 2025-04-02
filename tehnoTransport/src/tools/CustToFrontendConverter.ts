import { Timestamp } from "firebase/firestore";
import daysRemainingAndStatusCalc from "./daysRemainingAndStatusCalc";
import Customer from "../interfaces/CustomerInterface";

const CustToFrontendFormater = (customer: Customer) => {
  const { brand, model, regNumber, firstName, phone, dateOfLastTehnoTest } =
    customer;

  // Calculate days remaining and status
  const daysRemaining =
    daysRemainingAndStatusCalc.calculateDaysRemaining(dateOfLastTehnoTest);
  const status = daysRemainingAndStatusCalc.getStatus(daysRemaining);

  // Return the formatted customer data
  return {
    brand,
    model,
    regNumber,
    firstName,
    phone,
    daysRemaining,
    status,
  };
};

export default CustToFrontendFormater;
