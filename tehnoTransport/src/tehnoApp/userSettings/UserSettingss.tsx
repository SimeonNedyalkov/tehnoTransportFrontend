import {
  Text,
  Box,
  Heading,
  Button,
  useFileUploadContext,
  Float,
  Field,
  Input,
  FileUpload,
  Flex,
  IconButton,
  Icon,
  HStack,
  Stack,
} from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../../components/ui/password-input";

import { useEffect, useState } from "react";

import { LuEye, LuEyeOff, LuFileImage, LuX } from "react-icons/lu";
import { InputGroup } from "../../components/ui/input-group";
import {
  ChevronLeft,
  ChevronRight,
  EyeClosed,
  LockKeyhole,
  UserCog,
} from "lucide-react";
import FileUploadItemGroup from "./FileUpload";
import ChangePassword from "./ChangePassword";
import { useTranslation } from "react-i18next";
interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
}

export default function UserSettings() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState(user?.email || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState<File | null>(null);
  const { t } = useTranslation();
  const USERURL = "http://localhost:3000/user/getUser";
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const loggedUser = await fetch(USERURL, {
        method: "GET",
        credentials: "include",
      });
      const userData = await loggedUser.json();
      setUser(userData);
      setEmail(userData.email);
      setDisplayName(userData.displayName || "");
    };
    getUser();
  }, []);

  const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    useEffect(() => {
      if (files.length > 0) {
        setPhotoURL(files[0]);
      }
    }, [files]);

    if (files.length === 0) return null;
    return <FileUploadItemGroup files={files} />;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("displayName", displayName);
    if (photoURL) {
      formData.append("photoURL", photoURL);
    }
    const response = await fetch("http://localhost:3000/user/updateUser", {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
    }
  };

  return (
    <Flex h="100vh" justify="center" align="center" gap="10">
      <Box
        h="100%"
        w="30rem"
        p={6}
        borderRadius="12px"
        boxShadow="lg"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <HStack w="full" justifyContent="space-between" mb={6}>
          <IconButton
            aria-label="Previous"
            disabled={page === 0}
            onClick={() => setPage(0)}
            colorPalette="transparent"
          >
            <Icon>
              <ChevronLeft />
            </Icon>
          </IconButton>

          <Heading size="lg">
            <HStack>
              {page === 0 ? <UserCog /> : <LockKeyhole />}{" "}
              {page === 0
                ? t("usUserSettingsTitle")
                : t("usChangePasswordTitle")}
            </HStack>
          </Heading>

          <IconButton
            aria-label="Next"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <Icon>
              <ChevronRight />
            </Icon>
          </IconButton>
        </HStack>
        {page === 0 ? (
          user ? (
            <>
              <Text fontSize="xl">
                {t("usWelcome")}
                {user.displayName || "User"}
              </Text>
              <Text fontSize="lg" mb={4}>
                {t("usEmail")}
                {user.email}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={3}>
                UID: {user.uid}
              </Text>
              <Field.Root required mb={3} marginTop="2rem">
                <Field.Label fontSize="md">{t("usEmail1")}</Field.Label>
                <Input
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field.Root>
              <Field.Root mb={3} marginTop="2rem">
                <Field.Label fontSize="md">{t("dName")}</Field.Label>
                <Input
                  placeholder={user.displayName || "Your Name"}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Field.Root>
              <Field.Root
                mb={3}
                alignItems="center"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                marginTop="2rem"
              >
                <Field.Label fontSize="md">{t("usUploadImage")}</Field.Label>
                <FileUpload.Root accept="image/*">
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm" mt="3">
                      <LuFileImage />
                      {t("usUploadImageHere")}
                    </Button>
                  </FileUpload.Trigger>
                  <FileUploadList />
                </FileUpload.Root>
              </Field.Root>
              <Button marginTop="auto" onClick={handleSubmit}>
                {t("usUpdateProfile")}
              </Button>
            </>
          ) : (
            <Text fontSize="xl" color="red.500">
              {t("usNoUser")}
            </Text>
          )
        ) : (
          <ChangePassword />
        )}
      </Box>
    </Flex>
  );
}
