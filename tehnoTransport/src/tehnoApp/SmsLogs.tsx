import { Avatar, Badge, Button, Card, HStack, Stack } from "@chakra-ui/react";
import useGetSmsLogs from "../hooks/useGetSmsLogs";
import { useEffect, useState } from "react";
import SmsInterface from "../interfaces/SmsInterface";

export default function SmsLogs() {
  const DATA = useGetSmsLogs();
  const [smses, setSmses] = useState<SmsInterface[]>([]);

  useEffect(() => {
    if (DATA.length !== 0) {
      setSmses(DATA);
    }
  }, [DATA]);
  console.log(smses);

  return (
    <Stack gap="4" direction="row" wrap="wrap">
      {smses.map((sms, index) => (
        <Card.Root width="320px" variant="elevated" key={index}>
          <Card.Body gap="2">
            <Card.Title mb="2">{sms.senderName || "Unknown Sender"}</Card.Title>
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src={"https://picsum.photos/200/300"} />
              <Avatar.Fallback name={sms.senderName || "Unknown Sender"} />
            </Avatar.Root>
            <HStack mt="4">
              <Badge>Sender: {sms.senderName}</Badge>
              <Badge>Receiver: {sms.receiverName}</Badge>
            </HStack>
            <Card.Description>
              {sms.message.length > 50
                ? sms.message.substring(0, 50) + "..."
                : sms.message}
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">View</Button>
            <Button>Reply</Button>
          </Card.Footer>
        </Card.Root>
      ))}
    </Stack>
  );
}
