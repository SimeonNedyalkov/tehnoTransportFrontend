import { Timestamp } from "firebase/firestore";

export default interface SmsInterface {
  customerID: string;
  senderName: string;
  receiverName: string;
  isSent: boolean;
  message: string;
  response: string;
  sentAt: Timestamp;
}
