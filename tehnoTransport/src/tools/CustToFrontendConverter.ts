import daysRemainingAndStatusCalc from "./daysRemainingAndStatusCalc";
import Customer from "../interfaces/CustomerInterface";

const CustToFrontendFormater = (customer: Customer) => {
  const {
    brand,
    model,
    regNumber,
    firstName,
    phone,
    dateOfNextTehnoTest,
    isSmsSent,
  } = customer;

  const daysRemaining =
    daysRemainingAndStatusCalc.calculateDaysRemaining(dateOfNextTehnoTest);
  const status = daysRemainingAndStatusCalc.getStatus(daysRemaining);

  return {
    brand,
    model,
    regNumber,
    firstName,
    phone,
    daysRemaining,
    status,
    isSmsSent,
  };
};

export default CustToFrontendFormater;
