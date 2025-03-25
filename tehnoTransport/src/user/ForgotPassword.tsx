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
      alignContent="center"
      alignItems="center"
    >
      <Heading>Forgot Your Password ??? </Heading>
      <Heading>Send me an email !!! </Heading>
      <Box
        maxW="md"
        mx="auto"
        mt={{ base: "4", md: "12" }}
        p={{ base: "6", md: "8" }}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <form onSubmit={onSubmit}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input {...register("email")} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Last name</Field.Label>
              <PasswordInput {...register("password")} />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
