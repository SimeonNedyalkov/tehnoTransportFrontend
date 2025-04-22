import { Box, HStack, Input } from "@chakra-ui/react";
import { InputGroup } from "../../components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Filters({ columnFilters, setColumnFilters }: any) {
  const selectedFilter = columnFilters[columnFilters.length - 1]?.id || "brand";
  const taskName =
    columnFilters.find((f: any) => f.id === selectedFilter)?.value || "";
  const [searchValue, _setSearchValue] = useState(taskName);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(selectedFilter, searchValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const onFilterChange = (id: any, value: any) => {
    setColumnFilters((prev: any) => {
      const existingFilter = prev.find((f: any) => f.id === id);

      if (existingFilter?.value === value) return prev;
      return prev
        .filter((f: any) => f.id !== id)
        .concat({ id, value: String(value) });
    });
  };

  return (
    <Box>
      <HStack gap="10" width="full">
        <InputGroup flex="1" maxW="12rem" startElement={<LuSearch />}>
          <Input
            placeholder={t("searchPlaceholder")}
            type="text"
            variant="outline"
            borderRadius={5}
            value={taskName}
            onChange={(e) => onFilterChange(selectedFilter, e.target.value)}
            size="sm"
          />
        </InputGroup>
      </HStack>
    </Box>
  );
}
