import { Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import CellPropsInterface from "../../interfaces/CellPropsInterface";
import { Timestamp } from "firebase/firestore";
import { CiViewTable } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "../../components/ui/tooltip";
import API from "../../crud/API";
import Customer from "../../interfaces/CustomerInterface";
import daysRemainingAndStatusCalc from "../../tools/daysRemainingAndStatusCalc";
import timestampToDateStringConverter from "../../tools/DateOrTimestampConverter";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";

export default function ActionsCell({ row, table }: CellPropsInterface) {
  const [_customer, setCustomer] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const [oldCustomer, _setOldCustomer] = useState<Customer>({
    id: "",
    brand: "Unknown Brand",
    createdAt: undefined,
    dateOfLastTehnoTest: Timestamp.now(),
    dateOfNextTehnoTest: Timestamp.now(),
    firstName: "",
    model: "",
    phone: "",
    regNumber: "",
    isSmsSent: false,
    status: "",
    daysRemaining: 0,
    isSentToApp: false,
  });

  const handleCreate = async (rowIndex: number) => {
    const { id, ...customer } = row.original;

    try {
      const updatedCustomer = await API.createCustomer({
        ...customer,
        isSmsSent: false,
        isSentToApp: false,
      });

      const rawTimestamp = updatedCustomer.dateOfNextTehnoTest;
      const seconds =
        rawTimestamp?.seconds ??
        rawTimestamp?._seconds ??
        rawTimestamp?.toDate?.().getTime() / 1000 ??
        Date.now() / 1000;
      const testDate = new Date(seconds * 1000);

      const timestamp = Timestamp.fromDate(testDate);

      updatedCustomer.daysRemaining =
        daysRemainingAndStatusCalc.calculateDaysRemaining(timestamp);
      updatedCustomer.status = daysRemainingAndStatusCalc.getStatus(
        updatedCustomer.daysRemaining
      );
      updatedCustomer.dateOfLastTehnoTest = timestampToDateStringConverter(
        updatedCustomer.dateOfLastTehnoTest
      )
        .toISOString()
        .split("T")[0];
      setCustomer(updatedCustomer);

      Object.keys(updatedCustomer).forEach((key) => {
        if (key === "dateOfLastTehnoTest") {
          table.options.meta.updateData(
            rowIndex,
            key,
            updatedCustomer["dateOfLastTehnoTest"]
          );
        }
        table.options.meta.updateData(row.index, key, updatedCustomer[key]);
      });
      return updatedCustomer;
    } catch (error) {
      console.error("Error create customer data:", error);
    }
  };

  const handleUpdate = async (rowIndex: number) => {
    const customer = row.original;
    try {
      let updatedCustomer;
      if (
        oldCustomer &&
        oldCustomer.dateOfLastTehnoTest !== customer.dateOfLastTehnoTest
      ) {
        customer.isSmsSent = false;
        customer.isSentToApp = false;
        updatedCustomer = await API.updateCustomer(customer.id, {
          ...customer,
          isSmsSent: false,
          isSentToApp: false,
        });
      } else {
        updatedCustomer = await API.updateCustomer(customer.id, customer);
      }
      updatedCustomer = await API.updateCustomer(customer.id, customer);
      const testDate = new Date(
        updatedCustomer.dateOfNextTehnoTest._seconds * 1000
      );

      const timestamp = Timestamp.fromDate(testDate);

      updatedCustomer.daysRemaining =
        daysRemainingAndStatusCalc.calculateDaysRemaining(timestamp);
      updatedCustomer.status = daysRemainingAndStatusCalc.getStatus(
        updatedCustomer.daysRemaining
      );
      updatedCustomer.dateOfLastTehnoTest = timestampToDateStringConverter(
        updatedCustomer.dateOfLastTehnoTest
      )
        .toISOString()
        .split("T")[0];
      updatedCustomer.dateOfNextTehnoTest = timestampToDateStringConverter(
        updatedCustomer.dateOfNextTehnoTest
      )
        .toISOString()
        .split("T")[0];
      setCustomer(updatedCustomer);
      Object.keys(updatedCustomer).forEach((key) => {
        table.options.meta.updateData(rowIndex, key, updatedCustomer[key]);
      });
      return updatedCustomer;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    const customer = row.original;
    try {
      const deletedCustomer = await API.deleteCustomer(customer.id);
      setCustomer(deletedCustomer);
      table.options.meta.removeRow(rowIndex);
      setIsModalOpen(false);
      return deletedCustomer;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Box>
      <Tooltip
        showArrow
        content={t("add")}
        positioning={{ placement: "top-end" }}
      >
        <Button
          size="md"
          onClick={() => handleCreate(row.index)}
          background="transparent"
          padding="8px"
        >
          <CiViewTable color="blue" size="8" />
        </Button>
      </Tooltip>
      <Tooltip
        showArrow
        content={t("update")}
        positioning={{ placement: "top-end" }}
      >
        <Button
          size="sm"
          colorScheme="green"
          bg="transparent"
          onClick={() => handleUpdate(row.index)}
          padding="8px"
        >
          <FiEdit color="green" size="8" />
        </Button>
      </Tooltip>
      <Tooltip
        showArrow
        content={t("delete")}
        positioning={{ placement: "top-end" }}
      >
        <Button
          size="sm"
          colorScheme="red"
          bg="transparent"
          onClick={() => setIsModalOpen((prev) => !prev)}
          padding="8px"
        >
          <FaTrashAlt color="red" size="8" />
        </Button>
      </Tooltip>
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            {`${t("aYs")}`}
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: theme.palette.text.secondary }}
            >
              {t("tAcBu")}
            </DialogContentText>
          </DialogContent>

          <DialogActions sx={{ padding: theme.spacing(2) }}>
            <Button onClick={handleClose} colorPalette="red" variant="surface">
              {t("disagree")}
            </Button>
            <Button
              onClick={() => handleDelete(row.index)}
              autoFocus
              colorPalette="green"
              variant="surface"
            >
              {t("agree")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
