import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Snackbar from "@mui/material/Snackbar";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../../components/ui/password-input";
import { useEffect, useState } from "react";
import { SnackbarCloseReason } from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert";
export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [value, setValue] = useState(0);
  const [allreadyAddedArray, setAllreadyAddedArray] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkPasswordStrength, setCheckPasswordStrength] = useState({
    passLength: 0,
    passIncludesSymbol: 0,
    passCapitalLetter: 0,
    passNumber: 0,
  });

  useEffect(() => {
    const formatIncludesSymbolChecker = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~]/;
    const cap = /[A-Z]/;
    const numb = /[0-9]/;

    setCheckPasswordStrength({
      passLength: newPassword.length >= 8 ? 1 : 0,
      passIncludesSymbol: formatIncludesSymbolChecker.test(newPassword) ? 1 : 0,
      passCapitalLetter: cap.test(newPassword) ? 1 : 0,
      passNumber: numb.test(newPassword) ? 1 : 0,
    });
  }, [newPassword]);

  useEffect(() => {
    Object.entries(checkPasswordStrength).forEach(([key, value]) => {
      if (!allreadyAddedArray.includes(key)) {
        if (value === 1) {
          setAllreadyAddedArray((prev) => [...prev, key]);
          setValue((prev) => prev + 1);
        }
      } else if (value === 0) {
        setAllreadyAddedArray((prev) => prev.filter((el) => el !== key));
        setValue((prev) => prev - 1);
      }
    });
  }, [checkPasswordStrength]);

  const handleSubmit = () => {
    if (newPassword === repeatPassword) {
      if (value >= 3) {
        setFail(false);
        return setOpen(true);
      } else {
        setFail(true);
        setErrorMessage("Password not strong enough");
        return setOpen(true);
      }
    } else {
      setFail(true);
      setErrorMessage("Passwords do not match");
      return setOpen(true);
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <HStack>
        <Text>New Password</Text>
        <Stack maxW="300px">
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordStrengthMeter value={value} />
        </Stack>
      </HStack>
      <HStack>
        <Text>Repeat Password</Text>

        <PasswordInput
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </HStack>
      <Button onClick={handleSubmit}>Change Password</Button>
      {fail === false ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Password updated successfully !!!
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
