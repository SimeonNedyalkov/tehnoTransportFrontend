import { Timestamp } from "firebase/firestore";

export default interface Customer {
  id: string;
  brand: string | "Unknown Brand";
  createdAt?: Timestamp;
  dateOfLastTehnoTest: Timestamp;
  dateOfNextTehnoTest: Timestamp;
  firstName: string;
  model: string;
  phone: string;
  regNumber: string;
  isSmsSent: boolean;
  status?: string;
  daysRemaining?: number;
  isSentToApp?: boolean;
  checked?: boolean;
}
