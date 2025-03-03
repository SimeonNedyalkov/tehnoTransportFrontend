import { Box, HStack, Input } from "@chakra-ui/react";
import { InputGroup } from "../../components/ui/input-group";
import { LuSearch } from "react-icons/lu";

export default function Filters({ columnFilters, setColumnFilters }: any) {
  console.log(columnFilters);

  const selectedFilter = columnFilters[columnFilters.length - 1]?.id || "brand";
  const taskName =
    columnFilters.find((f: any) => f.id === selectedFilter)?.value || "";

  const onFilterChange = (id: any, value: any) => {
    setColumnFilters((prev: any) =>
      prev.filter((f: any) => f.id !== id).concat({ id, value: String(value) })
    );
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
