import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGetSmsLogs from "../hooks/useGetSmsLogs";
import { useEffect, useState } from "react";
import SmsInterface from "../interfaces/SmsInterface";
import timestampToDateStringConverter from "../tools/DateOrTimestampConverter";
import CustomFilter from "../components/ui/customFilter/customFilter";
import { useTranslation } from "react-i18next";
import CarLoader from "../loaders/CarLoader";
import { useUser } from "../tools/UserContext";

export default function SmsLogs() {
  const DATA = useGetSmsLogs();
  const [smses, setSmses] = useState<SmsInterface[]>([]);
  const [filteredSmses, setFilteredSmses] = useState<SmsInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { user, loading } = useUser();
  useEffect(() => {
    if (DATA.length !== 0) {
      setSmses(DATA);
      setFilteredSmses(DATA); // Show all initially
    }
  }, [DATA]);
  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading === false ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100vh" // or any height that fits your design
        >
          <CarLoader />
        </Flex>
      ) : (
        <Stack gap="4" direction="row" wrap="wrap" mt="10">
          <VStack>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              minWidth="500px"
              maxWidth="500px"
              p={4}
              borderRadius="lg"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
              bg="white"
            >
              <CustomFilter smses={smses} onFiltered={setFilteredSmses} />
            </Box>
            <Flex wrap="wrap" gap={4} pt="2">
              {filteredSmses.map((sms, index) => (
                <Card.Root width="320px" variant="elevated" key={index}>
                  <Card.Body gap="2">
                    <Flex justify="space-between" align="center">
                      <HStack mt="4" justifyContent="space-between">
                        <Avatar.Root size="lg" shape="rounded">
                          <Avatar.Image
                            src={
                              user.displayName === sms.senderName
                                ? user.photoURL
                                : "https://picsum.photos/200/300"
                            }
                          />
                          <Avatar.Fallback
                            name={sms.senderName || "Unknown Sender"}
                          />
                        </Avatar.Root>
                        <Card.Title mb="2">
                          {sms.senderName || "Unknown Sender"}
                        </Card.Title>
                      </HStack>
                    </Flex>
                    <HStack justifyContent="space-between">
                      <Text color="fg.muted" textStyle="sm">
                        @
                        {String(
                          timestampToDateStringConverter(sms.sentAt)
                            .toISOString()
                            .split("T")[0]
                        )}
                      </Text>

                      <Text
                        color={
                          sms.response === "success" ? "green.600" : "red.600"
                        }
                        textStyle="sm"
                      >
                        {sms.response}
                      </Text>
                    </HStack>
                    <Card.Description>
                      {sms.message.length > 50
                        ? sms.message.substring(0, 120) + "..."
                        : sms.message}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent="flex-end">
                    <HStack mt="4">
                      <Badge>
                        {t("sender")}
                        <br />
                        {sms.senderName}
                      </Badge>
                      <Badge>
                        {t("receiver")} <br />
                        {sms.receiverName}
                      </Badge>
                    </HStack>
                  </Card.Footer>
                </Card.Root>
              ))}
            </Flex>
          </VStack>
        </Stack>
      )}
    </>
  );
}
