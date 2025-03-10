import { Box, HStack, Input } from "@chakra-ui/react";
import { InputGroup } from "../../components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function Filters({ columnFilters, setColumnFilters }: any) {
  console.log(columnFilters);

  const selectedFilter = columnFilters[columnFilters.length - 1]?.id || "brand";
  const taskName =
    columnFilters.find((f: any) => f.id === selectedFilter)?.value || "";
  const [searchValue, setSearchValue] = useState(taskName);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(selectedFilter, searchValue);
    }, 500); // Delay execution by 500ms

    return () => clearTimeout(handler);
  }, [searchValue]);

  const onFilterChange = (id: any, value: any) => {
    setColumnFilters((prev: any) => {
      const existingFilter = prev.find((f: any) => f.id === id);
      console.log(existingFilter);
      // if (id === "dateOfTehnoTest") {
      //   const selectedDate = new Date(value);
      //   value = {
      //     seconds: Math.floor(selectedDate.getTime() / 1000),
      //     nanoseconds: 0,
      //   };
      // }

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
            placeholder="Search"
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
