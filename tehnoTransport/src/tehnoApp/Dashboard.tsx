import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import {
  Box,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatGroup,
  Spinner,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
type DashboardProps = {
  customers: Customer[];
};
export default function Dashboard({ customers }: DashboardProps) {
  const [_refreshData, setRefreshData] = useState(false);
  const { t } = useTranslation();
  const [customersState, setCustomersState] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState({
    upcoming: 0,
    dueSoon: 0,
    valid: 0,
    overdue: 0,
    expired: 0,
  });
  useEffect(() => {
    const getCustomer = async () => {
      setLoading(true);
      try {
        let upcoming = 0;
        let dueSoon = 0;
        let overdue = 0;
        let valid = 0;
        let expired = 0;
        const filteredData: Customer[] = customers.map((customer) => {
          if (customer.status === "Upcoming") upcoming += 1;
          else if (customer.status === "Due Soon") dueSoon += 1;
          else if (customer.status === "Overdue") overdue += 1;
          else if (customer.status === "Valid") valid += 1;
          else if (customer.status === "Expired") expired += 1;
          return { ...customer };
        });
        setStatusCounts({ upcoming, dueSoon, overdue, valid, expired });
        setCustomersState(filteredData);
        setRefreshData((prev) => !prev);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching customer data.");
      } finally {
        setLoading(false);
      }
    };
    getCustomer();
  }, [customers]);

  if (loading) {
    return (
      <VStack mt={10}>
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </VStack>
    );
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  const chartData = [
    { name: t("statusDueSoon"), value: statusCounts.dueSoon, color: "#E53E3E" },
    {
      name: t("statusUpcoming"),
      value: statusCounts.upcoming,
      color: "#3182CE",
    },
    {
      name: t("statusValid"),
      value: statusCounts.valid,
      color: "#48BB78",
    },
    { name: t("statusOverdue"), value: statusCounts.overdue, color: "#8B4513" },
    { name: t("statusExpired"), value: statusCounts.expired, color: "#161112" },
  ];

  return (
    <VStack wordSpacing={6} w="100%" marginTop="10">
      <StatGroup
        w={{ base: "100%", md: "80%" }}
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
      >
        <Stat.Root textAlign="center">
          <StatLabel fontSize={{ base: "sm", md: "md" }}>
            {t("dueSoon")}
          </StatLabel>
          <Text
            fontWeight="bold"
            fontSize={{ base: "lg", md: "2xl" }}
            color="red.500"
          >
            {statusCounts.dueSoon}
          </Text>
        </Stat.Root>

        <Stat.Root textAlign="center">
          <StatLabel fontSize={{ base: "sm", md: "md" }}>
            {t("upcoming")}
          </StatLabel>
          <Text
            fontWeight="bold"
            fontSize={{ base: "lg", md: "2xl" }}
            color="blue.500"
          >
            {statusCounts.upcoming}
          </Text>
        </Stat.Root>

        <Stat.Root textAlign="center">
          <StatLabel fontSize={{ base: "sm", md: "md" }}>
            {t("valid")}
          </StatLabel>
          <Text
            fontWeight="bold"
            fontSize={{ base: "lg", md: "2xl" }}
            color="green.500"
          >
            {statusCounts.valid}
          </Text>
        </Stat.Root>

        <Stat.Root textAlign="center">
          <StatLabel fontSize={{ base: "sm", md: "md" }}>
            {t("overdue")}
          </StatLabel>
          <Text
            fontWeight="bold"
            fontSize={{ base: "lg", md: "2xl" }}
            color="#8B4513"
          >
            {statusCounts.overdue}
          </Text>
        </Stat.Root>

        <Stat.Root textAlign="center">
          <StatLabel fontSize={{ base: "sm", md: "md" }}>
            {t("expired")}
          </StatLabel>
          <Text
            fontWeight="bold"
            fontSize={{ base: "lg", md: "2xl" }}
            color="#161112"
          >
            {statusCounts.expired}
          </Text>
        </Stat.Root>
      </StatGroup>

      <Box w={{ base: "90%", md: "50%" }} h="300px" mt={6}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box w={{ base: "95%", md: "80%" }} overflowX="auto">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          {t("dashboardText")}
        </Text>
        <HStack
          justifyContent="space-between"
          w="100%"
          fontWeight="bold"
          display={{ base: "none", md: "flex" }}
        >
          <Text flex={2}>{t("dName")}</Text>
          <Text flex={1}>{t("dStatus")}</Text>
          <Text flex={1} textAlign="right">
            {t("dNextTehnoDate")}
          </Text>
        </HStack>
        {customersState
          .filter(
            (c) =>
              c.status !== "Overdue" &&
              c.status !== "Valid" &&
              c.status !== "Expired"
          )
          .slice(0, 5)
          .map((customer) => (
            <HStack
              key={customer.id}
              justifyContent="space-between"
              w="100%"
              p={2}
              borderBottom="1px solid lightgray"
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}
            >
              <Text
                flex={2}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={{ base: "sm", md: "md" }}
              >
                {customer.firstName}
              </Text>
              <Text
                flex={1}
                color={customer.status === "Due Soon" ? "red.500" : "blue.500"}
                fontSize={{ base: "sm", md: "md" }}
              >
                {t(`status${customer.status?.replace(" ", "") ?? "Unknown"}`)}
              </Text>
              <Text
                flex={1}
                textAlign={{ base: "left", md: "right" }}
                fontSize={{ base: "sm", md: "md" }}
              >
                {String(customer.dateOfLastTehnoTest)}
              </Text>
            </HStack>
          ))}
      </Box>
    </VStack>
  );
}
