import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import API from "../../crud/API";

export default function AlertDialog(
  row: any,
  table: any,
  customer: any,
  setCustomer: any
) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (rowIndex: number) => {
    const customer = row.original;
    try {
      const deletedCustomer = await API.deleteCustomer(customer.id);
      table.options.meta.removeRow(row.index);
      setCustomer(deletedCustomer);
      return deletedCustomer;
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  return <React.Fragment></React.Fragment>;
}
