import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CellPropsInterface from "../../interfaces/CellPropsInterface";

export default function EditableCell({
  getValue,
  row,
  column,
  table,
}: CellPropsInterface) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <Input
      variant="outline"
      size="sm"
      w="99%"
      height="97%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}
