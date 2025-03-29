import { Timestamp } from "firebase/firestore";
import daysRemainingAndStatusCalc from "./daysRemainingAndStatusCalc";
import Customer from "../interfaces/CustomerInterface";

const CustToFrontendFormater = (customer: Customer) => {
  const { brand, model, regNumber, firstName, phone, dateOfTehnoTest } =
    customer;

  // Calculate days remaining and status
  const daysRemaining =
    daysRemainingAndStatusCalc.calculateDaysRemaining(dateOfTehnoTest);
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
