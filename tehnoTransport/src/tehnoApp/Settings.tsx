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

export default function Settings() {
  const { theme, toggleTheme, language, setLanguage } = useSettings();

  return (
    <Flex h="100vh" justify="center" align="center" gap="10">
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
    </Flex>
  );
}
