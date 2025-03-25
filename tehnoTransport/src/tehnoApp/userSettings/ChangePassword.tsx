import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { LockKeyhole } from "lucide-react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../../components/ui/password-input";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [checkPasswordStrength, setCheckPasswordStrenght] = useState(0);
  useEffect(() => {
    if (newPassword.length >= 5) {
      setCheckPasswordStrenght((prev) => prev + 1);
    }
  }, [newPassword]);
  return (
    <>
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
    </>
  );
}
