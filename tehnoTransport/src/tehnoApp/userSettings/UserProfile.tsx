import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import { useUser } from "../../tools/UserContext";
import { useNavigate } from "react-router-dom";

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
}

interface UserProfileProps {
  user: User;
}

export default function UserProfile() {
  const { user, loading } = useUser();
  const navigation = useNavigate();
  const LOGOUTURL = "http://localhost:3000/user/logout";
  const handleLogout = async () => {
    try {
      const response = await fetch(LOGOUTURL, {
        method: "POST",
        credentials: "include",
      });

      if (response.status == 200) {
        console.log("User logged out successfully!");
        navigation("/");
      } else {
        console.log(`${response.status} -- Logout failed`);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  console.log(user);
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
      minH="100vh"
    >
      <Box
        maxW="sm"
        w="full"
        boxShadow="md"
        rounded="lg"
        p={6}
        textAlign="center"
        border="1px solid"
        borderColor="black"
      >
        <Flex justify="center" mb={4}>
          <Image
            src={user.photoURL || ""}
            boxSize="120px"
            borderRadius="full"
            objectFit="cover"
            alt={user.displayName || "User Avatar"}
          />
        </Flex>
        <Heading fontSize="2xl">{user.displayName || "Anonymous User"}</Heading>
        <Text fontSize="sm" color="gray.500">
          {user.email}
        </Text>

        <Stack align="center" justify="center" direction="row" mt={4}>
          <Badge
            px={2}
            py={1}
            bg={user.emailVerified ? "green.100" : "red.100"}
            color={user.emailVerified ? "green.800" : "red.800"}
            rounded="full"
          >
            {user.emailVerified ? "Email Verified" : "Email Not Verified"}
          </Badge>
        </Stack>
        <Button
          w="100%"
          mt="10"
          variant="outline"
          colorPalette="green"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
}
