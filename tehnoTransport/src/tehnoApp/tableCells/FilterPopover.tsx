import { Button, Text, VStack, Flex } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useState } from "react";
import FilterIcon from "../../components/ui/Icons/FilterIcon";
const filterKeys = [
  "brand",
  "model",
  "regNumber",
  "firstName",
  "phone",
  "status",
  "dateOfTehnoTest",
];

function KeyItem({
  filteredItem,
  setColumnFilters,
  selectedItem,
  setSelectedItem,
}: any) {
  return (
    <Flex
      align="center"
      cursor="pointer"
      borderRadius={5}
      fontWeight="bold"
      p={1.5}
      _hover={{ bg: "gray.800" }}
      bgColor={selectedItem === filteredItem ? "gray.700" : "transparent"}
      onClick={() => {
        if (selectedItem === filteredItem) {
          setSelectedItem("");
          setColumnFilters([]);
        } else {
          setColumnFilters([
            {
              id: [filteredItem],
              value: "",
            },
          ]);
          setSelectedItem(filteredItem);
        }
      }}
    >
      {filteredItem}
    </Flex>
  );
}

export default function FilterPopover({
  columnFilters,
  setColumnFilters,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  return (
    <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          <FilterIcon />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="md" fontWeight="bold" mb={4}>
            Filter By:
          </Text>
          <VStack align="flex-start" wordSpacing={1}>
            {filterKeys.map((filteredItem, index) => (
              <KeyItem
                filteredItem={filteredItem}
                key={index}
                setColumnFilters={setColumnFilters}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
