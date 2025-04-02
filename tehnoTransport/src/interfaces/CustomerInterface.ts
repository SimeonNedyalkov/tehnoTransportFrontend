import { Timestamp } from "firebase/firestore";

export default interface Customer {
  id: string;
  brand: string | "Unknown Brand";
  createdAt?: Timestamp;
  dateOfLastTehnoTest: Timestamp;
  firstName: string;
  model: string;
  phone: string;
  regNumber: string;
  status?: string;
  daysRemaining?: number;
  checked?: false;
}
