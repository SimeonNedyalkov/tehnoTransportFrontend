import { FileUpload, Float } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuX } from "react-icons/lu";

export default function FileUploadItemGroup({ files }: any) {
  const { t } = useTranslation();
  return (
    <FileUpload.ItemGroup>
      {files.map((file: any) => (
        <FileUpload.Item
          w="100%"
          h="100%"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage w="100%" h="100%" />

          <FileUpload.ItemContent
            marginLeft="10rem"
            fontSize="sm"
            fontWeight="bold"
          >
            {t("usPictureName")} {file.name}
          </FileUpload.ItemContent>

          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger
              boxSize="4"
              layerStyle="fill.solid"
              color="pink.700"
              bg="transparent"
              mt={6}
            >
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
}
