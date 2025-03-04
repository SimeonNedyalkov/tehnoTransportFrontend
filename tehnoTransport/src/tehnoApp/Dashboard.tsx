import { useEffect, useState } from "react";
import Customer from "../interfaces/CustomerInterface";
import useGetCustomer from "../hooks/useGetCustomer";
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
import { Timestamp } from "firebase/firestore";

export default function Dashboard() {
  const customers = useGetCustomer();
  const [customersState, setCustomersState] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState({
    upcoming: 0,
    dueSoon: 0,
    overdue: 0,
  });

  useEffect(() => {
    const getCustomer = async () => {
      setLoading(true);
      try {
        let upcoming = 0;
        let dueSoon = 0;
        let overdue = 0;
        const filteredData: Customer[] = customers.map((customer) => {
          if (customer.status === "Upcoming") upcoming += 1;
          else if (customer.status === "Due Soon") dueSoon += 1;
          else if (customer.status === "Overdue") overdue += 1;
          return { ...customer };
        });
        setStatusCounts({ upcoming, dueSoon, overdue });
        setCustomersState(filteredData);
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

  // Data for Pie Chart
  const chartData = [
    { name: "Upcoming", value: statusCounts.upcoming, color: "#3182CE" },
    { name: "Due Soon", value: statusCounts.dueSoon, color: "#ECC94B" },
    { name: "Overdue", value: statusCounts.overdue, color: "#E53E3E" },
  ];

  return (
    <VStack wordSpacing={6} w="100%">
      {/* KPI Cards */}
      <StatGroup w="80%" justifyContent="space-between">
        <Stat.Root>
          <Stat.Label>Upcoming Tests</Stat.Label>
          <Stat.ValueText color="blue.500">
            {statusCounts.upcoming}
          </Stat.ValueText>
        </Stat.Root>
        <Stat.Root>
          <StatLabel>Due Soon</StatLabel>
          <Stat.ValueText color="yellow.500">
            {statusCounts.dueSoon}
          </Stat.ValueText>
        </Stat.Root>
        <Stat.Root>
          <StatLabel>Overdue</StatLabel>
          <Stat.ValueText color="red.500">
            {statusCounts.overdue}
          </Stat.ValueText>
        </Stat.Root>
      </StatGroup>

      {/* Pie Chart */}
      <Box w="50%" h="300px">
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

      {/* Recent Tests List */}
      <Box w="80%">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Customers with Upcoming Tests
        </Text>
        <HStack justifyContent="space-between" w="100%" fontWeight="bold">
          <Text>Name</Text>
          <Text>Status</Text>
          <Text>Next Test Date</Text>
        </HStack>
        {customersState
          .filter((c) => c.status !== "Overdue") // Show only upcoming/due soon
          .slice(0, 5) // Limit to 5 customers
          .map((customer) => (
            <HStack
              key={customer.id}
              justifyContent="space-between"
              w="100%"
              p={2}
              borderBottom="1px solid lightgray"
            >
              <Text>{customer.firstName}</Text>
              <Text
                color={
                  customer.status === "Due Soon" ? "yellow.500" : "blue.500"
                }
              >
                {customer.status}
              </Text>
              <Text>{customer.dateOfTehnoTest.toString().split("T")[0]}</Text>
            </HStack>
          ))}
      </Box>
    </VStack>
  );
}
