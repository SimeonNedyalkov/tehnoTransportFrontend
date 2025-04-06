import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu.tsx";
import { Button } from "@chakra-ui/react";
import CellPropsInterface from "../../interfaces/CellPropsInterface.ts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
          {t(`status${value.replace(/\s/g, "")}`)}
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
