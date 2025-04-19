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
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { theme, toggleTheme, language, setLanguage } = useSettings();
  const { t } = useTranslation();
  return (
    <Flex h="100vh" justify="center" align="center" gap="10">
      <Box
        h="100%"
        maxW="500px"
        minWidth="500px"
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
        <Heading size="lg" mb={100}>
          ⚙️ {t("settings")}
        </Heading>

        <VStack w="100%" align="center">
          <HStack justify="space-between" w="100%">
            <Text>{t("choseTheme")} </Text>
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
              <Switch.Label>
                {t("switchLabel", {
                  theme: t(
                    `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`
                  ),
                })}
              </Switch.Label>
            </Switch.Root>
          </HStack>

          <HStack justify="space-between" w="100%">
            <Text>{t("choseLanguage")}</Text>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
                sx={{
                  backgroundColor: theme === "dark" ? "gray.800" : "white",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                <MenuItem value={"bg"}>{t("bulgarian")}</MenuItem>
                <MenuItem value={"en"}>{t("english")}</MenuItem>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}
