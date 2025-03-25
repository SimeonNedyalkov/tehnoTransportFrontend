import {
  Box,
  Button,
  Input,
  Stack,
  Field,
  Heading,
  Flex,
} from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "./../components/ui/password-input";
import { useForm } from "react-hook-form";
const FORGOT_PASSWORD_URL = "http://localhost:3000/user/sendPasswordReset";
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

  const onSubmit = handleSubmit((data) => console.log(data));

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

            <Field.Root invalid={!!errors.password}>
              <Field.Label htmlFor="password">Password</Field.Label>
              <PasswordInput
                id="password"
                placeholder="Enter new password"
                size="lg"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
