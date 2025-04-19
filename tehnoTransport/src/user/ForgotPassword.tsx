import {
  Box,
  Button,
  Input,
  Stack,
  Field,
  Heading,
  Flex,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
const FORGOT_PASSWORD_URL =
  "https://tehno-transport-b.onrender.com/user/sendPasswordReset";
interface FormValues {
  email: string;
  password: string;
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const { email } = data;
    const response = await fetch(FORGOT_PASSWORD_URL, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response;
  });

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      minH="100vh"
      py="8"
    >
      <Heading as="h1" size="xl" color="teal.600" mb="4">
        Forgot Your Password?
      </Heading>
      <Heading as="h2" size="md" color="gray.500" mb="8">
        We'll send you an email to reset it!
      </Heading>
      <Box
        maxW="lg"
        w="full"
        p="8"
        borderRadius="md"
        bg="white"
        boxShadow="lg"
        border="1px"
        borderColor="gray.200"
      >
        <form onSubmit={onSubmit}>
          <Stack gap="6" align="flex-start">
            <Field.Root invalid={!!errors.email}>
              <Field.Label htmlFor="email">Email</Field.Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                size="lg"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              size="lg"
              colorScheme="teal"
              width="full"
              mt="4"
            >
              Send Reset Link
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
