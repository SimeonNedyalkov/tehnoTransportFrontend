import { Timestamp } from "firebase/firestore";

export default interface NewCustomer {
  brand: string | "Unknown Brand";
  dateOfTehnoTest: Timestamp | Date;
  firstName: string;
  model: string;
  phone: number;
  regNumber: string;
  status?: string;
  daysRemaining?: number;
}
