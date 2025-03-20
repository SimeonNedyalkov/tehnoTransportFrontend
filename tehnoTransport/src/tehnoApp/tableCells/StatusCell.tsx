import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu.tsx";
import { Button } from "@chakra-ui/react";
import CellPropsInterface from "../../interfaces/CellPropsInterface.ts";
import { useEffect, useState } from "react";

export default function StatusCell({
  getValue,
  row,
  column,
  table,
}: CellPropsInterface) {
  const value = getValue() || "";
  const statuses = ["Upcoming", "Overdue", "Due Soon", "Valid", "Expired"];
  const { updateData } = table.options.meta;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant={isDark ? "solid" : "ghost"}
          size="sm"
          w="100%"
          height="100%"
          overflow="hidden"
          whiteSpace="nowrap"
          disabled
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
