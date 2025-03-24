import {
  HStack,
  Icon,
  Switch,
  Text,
  Box,
  Heading,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSettings } from "./SettingsProvider";
import { useEffect, useState } from "react";

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
}

export default function Settings() {
  const { theme, toggleTheme, language, setLanguage } = useSettings();
  const [user, setUser] = useState<User | null>(null);
  const USERURL = "http://localhost:3000/user/getUser";

  useEffect(() => {
    const getUser = async () => {
      const loggedUser = await fetch(USERURL, {
        method: "GET",
        credentials: "include",
      });
      const userData = await loggedUser.json();
      setUser(userData);
    };
    getUser();
  }, []);

  return (
    <Flex h="100vh" justify="center" align="center">
      <Box
        h="100%"
        maxW="400px"
        p={6}
        borderRadius="12px"
        boxShadow="lg"
        bg={theme === "dark" ? "gray.800" : "white"}
        color={theme === "dark" ? "white" : "black"}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* Ensure Heading is always at the top */}
        <Heading size="lg" mb={100}>
          ⚙️ Settings
        </Heading>

        {/* Settings Container */}
        <VStack w="100%" align="center">
          {/* Dark Mode Toggle */}
          <HStack justify="space-between" w="100%">
            <Text>Choose theme: </Text>
            <Switch.Root colorPalette="blue" size="lg">
              <Switch.HiddenInput />
              <Switch.Control onClick={toggleTheme}>
                <Switch.Thumb />
                <Switch.Indicator
                  fallback={<Icon as={FaMoon} color="gray.400" />}
                >
                  <Icon as={FaSun} color="yellow.400" />
                </Switch.Indicator>
              </Switch.Control>
              <Switch.Label>Switch {theme} mode</Switch.Label>
            </Switch.Root>
          </HStack>

          {/* Language Selector */}
          <HStack justify="space-between" w="100%">
            <Text>Change Language:</Text>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value={"bg"}>Bulgarian</MenuItem>
                <MenuItem value={"en"}>English</MenuItem>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
      </Box>
      <Box
        maxW="400px"
        p={6}
        borderRadius="12px"
        boxShadow="lg"
        bg={theme === "dark" ? "gray.800" : "white"}
        color={theme === "dark" ? "white" : "black"}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading size="lg" mb={6}>
          User Settings
        </Heading>

        {user ? (
          <>
            <Text fontSize="xl">Welcome, {user.displayName || "User"}</Text>
            <Text fontSize="lg" mb={4}>
              Email: {user.email}
            </Text>
            <Text fontSize="sm" color="gray.500">
              UID: {user.uid}
            </Text>
          </>
        ) : (
          <Text fontSize="xl" color="red.500">
            No user signed in
          </Text>
        )}
      </Box>
    </Flex>
  );
}
