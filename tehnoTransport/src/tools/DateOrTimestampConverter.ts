import { Timestamp } from "firebase/firestore";

function timestampToDateConverter(timestamp: Timestamp) {
  // const date = new Date(timestamp.seconds * 1000);
  // const localDate = new Date(
  //   date.getTime() - date.getTimezoneOffset() * 60000
  // );
  // let testDate: Date;
  // if (timestamp instanceof Timestamp) {
  //   // If it's a Firebase Timestamp
  //   testDate = customer.dateOfTehnoTest.toDate();
  // } else if (customer.dateOfTehnoTest instanceof Date) {
  //   // If it's already a Date object
  //   testDate = customer.dateOfTehnoTest;
  // } else {
  //   // If it's an object with seconds and nanoseconds (common in Firestore documents)
  //   testDate = new Date(customer.dateOfTehnoTest.seconds * 1000);
  // }
  // const timestamp = Timestamp.fromDate(testDate);
}
