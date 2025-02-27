import { Box, HStack, Input, InputAddon } from "@chakra-ui/react";
import { InputGroup } from "../../components/ui/input-group";
import { LuSearch } from "react-icons/lu";

export default function Filters({ columnFilters, setColumnFilters }: any) {
  const taskName =
    columnFilters.find((f: any) => f.id === "status")?.value || "";
  const onFilterChange = (id: any, value: any) => {
    setColumnFilters((prev: any) =>
      prev.filter((f: any) => f.id !== id).concat({ id, value })
    );
  };
  return (
    <Box mb={6}>
      <HStack gap="10" width="full">
        <InputGroup flex="1" maxW="12rem" startElement={<LuSearch />}>
          <Input
            placeholder="Search"
            type="text"
            variant="outline"
            borderRadius={5}
            value={taskName}
            onChange={(e) => onFilterChange("status", e.target.value)}
          />
        </InputGroup>
      </HStack>
    </Box>
  );
}
