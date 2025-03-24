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
} from "../components/ui/password-input";

import { useEffect, useState } from "react";

import { LuEye, LuEyeOff, LuFileImage, LuX } from "react-icons/lu";
import { InputGroup } from "../components/ui/input-group";
import { EyeClosed, LockKeyhole, UserCog } from "lucide-react";
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
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkPasswordStrength, setCheckPasswordStrenght] = useState(0);
  const USERURL = "http://localhost:3000/user/getUser";
  const formData = new FormData();
  useEffect(() => {
    if (newPassword.length >= 5) {
      setCheckPasswordStrenght((prev) => prev + 1);
    }
  }, [newPassword]);

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
    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="20"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger
                boxSize="4"
                layerStyle="fill.solid"
                colorPalette="orange"
                mt={6}
              >
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  };

  const handleSubmit = async () => {
    console.log(email);
    console.log(displayName);
    console.log(photoURL);
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
        maxW="400px"
        p={6}
        borderRadius="12px"
        boxShadow="lg"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading size="lg" mb={6}>
          <HStack>
            <UserCog />
            User Settings
          </HStack>
        </Heading>

        {user ? (
          <>
            <Text fontSize="xl">Welcome, {user.displayName || "User"}</Text>
            <Text fontSize="lg" mb={4}>
              Email: {user.email}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={3}>
              UID: {user.uid}
            </Text>
            <Field.Root required mb={3}>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field.Root>
            <Field.Root mb={3}>
              <Field.Label>Name</Field.Label>
              <Input
                placeholder={user.displayName || "Your Name"}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Field.Root>
            <Field.Root mb={3}>
              <Field.Label>Upload Image</Field.Label>
              <FileUpload.Root accept="image/*">
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm">
                    <LuFileImage /> Upload Images
                  </Button>
                </FileUpload.Trigger>
                <FileUploadList />
              </FileUpload.Root>
            </Field.Root>
            <Button onClick={handleSubmit}>Update Profile</Button>
          </>
        ) : (
          <Text fontSize="xl" color="red.500">
            No user signed in
          </Text>
        )}
      </Box>
      <Box
        h="100%"
        maxW="400px"
        p={6}
        borderRadius="12px"
        boxShadow="lg"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading size="lg" mb={6}>
          <HStack>
            <LockKeyhole />
            Change Password
          </HStack>
        </Heading>
        <HStack>
          <Text>New Password</Text>
          <Stack maxW="300px">
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordStrengthMeter value={checkPasswordStrength} />
          </Stack>
        </HStack>
        <HStack>
          <Text>Repeat Password</Text>

          <PasswordInput
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </HStack>
        <Button>Change Password</Button>
      </Box>
    </Flex>
  );
}
