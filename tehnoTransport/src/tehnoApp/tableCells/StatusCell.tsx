import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu.tsx";
import { Button } from "@chakra-ui/react";
import CellPropsInterface from "../../interfaces/CellPropsInterface.ts";

export default function StatusCell({
  getValue,
  row,
  column,
  table,
}: CellPropsInterface) {
  const value = getValue() || "";
  const statuses = ["Upcoming", "Overdue", "Due Soon"];
  const { updateData } = table.options.meta;
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          w="100%"
          height="100%"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {value}
        </Button>
      </MenuTrigger>
      <MenuContent>
        {statuses.map((status) => (
          <MenuItem
            value={status}
            _hover={{ bg: "grey.100", color: "grey.200" }}
            onClick={() => updateData(row.index, column.id, status)}
            key={status}
          >
            {status}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}
