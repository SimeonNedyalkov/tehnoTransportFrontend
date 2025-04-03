import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import refreshAuthToken from "../tools/refreshToken";
import SmsInterface from "../interfaces/SmsInterface";

export default function useGetSmsLogs() {
  const [getSms, setGetSms] = useState<SmsInterface[]>([]);
  const DBURL = "http://localhost:3000/sms-logs";
  const navigation = useNavigate();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        let response = await fetch(DBURL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          try {
            const refreshedData = await refreshAuthToken();
            if (!response.ok) {
              console.error("Failed to fetch data");
              if (refreshedData) {
                console.log("Retrying request with refreshed token...");
                response = await fetch(DBURL, {
                  method: "GET",
                  credentials: "include",
                });
                console.log(response);
              }
            } else {
              const data = await refreshedData.json();
              console.log("API Data:", data);
            }
          } catch (error) {}
          navigation("/");
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();

        const filteredData: SmsInterface[] = data.map((sms: SmsInterface) => {
          return {
            customerId: sms.customerID,
            isSent: sms.isSent,
            message: sms.message,
            response: sms.response,
            sentAt: sms.sentAt,
            senderName: sms.senderName,
            receiverName: sms.receiverName,
          };
        });

        setGetSms(filteredData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    getCustomer();
  }, []);

  return getSms;
}
