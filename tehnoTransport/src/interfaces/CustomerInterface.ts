import { Timestamp } from "firebase/firestore";

export default interface Customer {
  id: string;
  brand: string | "Unknown Brand";
  createdAt?: Timestamp | Date;
  dateOfTehnoTest: Timestamp;
  firstName: string;
  model: string;
  phone: number;
  regNumber: string;
  status?: string;
  daysRemaining?: number;
  checked?: false;
}
