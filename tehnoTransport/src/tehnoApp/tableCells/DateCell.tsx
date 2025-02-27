import { Timestamp } from "firebase/firestore";
import CellPropsInterface from "../../interfaces/CellPropsInterface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import { Center, Box, Icon } from "@chakra-ui/react";
import { X } from "lucide-react";
import CalendarIcon from "../../components/ui/Icons/CalendarIcon";

const DateCustomInput = forwardRef<
  HTMLDivElement,
  { value?: string; onClick?: () => void; clearDate?: () => void }
>(({ value, onClick, clearDate }, ref) => (
  <Center ref={ref} onClick={onClick} cursor="pointer" position="relative">
    {value ? (
      <>
        {value}
        {clearDate && (
          <Box
            position="absolute"
            right="3px"
            fontSize="md"
            color="red.300"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              clearDate();
            }}
          >
            {/* <Icon as={X} /> */}
          </Box>
        )}
      </>
    ) : (
      <Icon as={CalendarIcon} fontSize="sm" w={5} h={5} />
    )}
  </Center>
));

export default function DateCell({
  getValue,
  row,
  column,
  table,
}: CellPropsInterface) {
  let date = getValue();

  if (date instanceof Timestamp) {
    date = date.toDate();
  }

  const { updateData } = table.options.meta;

  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="yyyy MMM d"
      selected={date || null} // Ensure `null` is allowed
      onChange={(newDate) => updateData(row.index, column.id, newDate)}
      isClearable
      customInput={
        <DateCustomInput
          value={date ? date.toDateString() : ""}
          clearDate={() => updateData(row.index, column.id, null)}
        />
      }
    />
  );
}
