import { FileUpload, Float } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

export default function FileUploadItemGroup({ files }: any) {
  return (
    <FileUpload.ItemGroup>
      {files.map((file: any) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
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
