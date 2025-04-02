import { Timestamp } from "firebase/firestore";

export default interface NewCustomer {
  id?: string;
  brand: string | "Unknown Brand";
  dateOfLastTehnoTest: Timestamp | Date | string;
  createdAt?: Timestamp;
  firstName: string;
  model: string;
  phone: number;
  regNumber: string;
  // status?: string;
  // daysRemaining?: number;
}
