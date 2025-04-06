import SmsInterface from "../../../interfaces/SmsInterface";
import {
  Box,
  createListCollection,
  HStack,
  useSelectContext,
  VStack,
  Input,
  Text,
  IconButton,
  Portal,
  Select,
} from "@chakra-ui/react";
import {
  RiUserSharedLine,
  RiUserReceivedLine,
  RiForbidLine,
} from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { useEffect, useState } from "react";
import timestampToDateStringConverter from "../../../tools/DateOrTimestampConverter";
import { useTranslation } from "react-i18next";

interface CustomFilterProps {
  smses: SmsInterface[];
  onFiltered: (filtered: SmsInterface[]) => void;
}

export default function CustomFilter({ smses, onFiltered }: CustomFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("senderName");
  const [searchValue, setSearchValue] = useState<string>("");
  const { t } = useTranslation();

  const filteredSmses = smses.filter((sms) => {
    const filterField = sms[selectedFilter as keyof SmsInterface];
    if (!filterField) return false;

    if (selectedFilter === "sentAt") {
      const dateStr = timestampToDateStringConverter(sms.sentAt)
        .toISOString()
        .split("T")[0];
      return dateStr.toLowerCase().includes(searchValue.toLowerCase());
    }

    return filterField
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    onFiltered(filteredSmses);
  }, [searchValue, selectedFilter, smses]);

  return (
    <VStack align="stretch">
      <HStack>
        <Input
          placeholder={`${t("searchHere")}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          variant="flushed"
        />
        <Demo
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </HStack>
    </VStack>
  );
}

const SelectTrigger = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Framework[];
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      {...select.getTriggerProps()}
    >
      {select.hasSelectedItems ? items[0].icon : <RiForbidLine />}
    </IconButton>
  );
};

const Demo = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (val: string) => void;
}) => {
  const { t } = useTranslation();
  const frameworks = createListCollection({
    items: [
      { label: t("hSender"), value: "senderName", icon: <RiUserSharedLine /> },
      {
        label: t("hReceiver"),
        value: "receiverName",
        icon: <RiUserReceivedLine />,
      },
      { label: t("hDateofSms"), value: "sentAt", icon: <MdDateRange /> },
    ],
  });
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      size="sm"
      width="120px"
      m="0"
      p="0"
      ml="5"
      value={[selectedFilter]}
      onValueChange={(val) => setSelectedFilter(val.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                <HStack>
                  {framework.icon}
                  {framework.label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

interface Framework {
  label: string;
  value: string;
  icon: React.ReactNode;
}
