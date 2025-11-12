"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

interface ImageUpload {
  onUpload: (file: File) => void;
  onClear: () => void;
}

export default function ImageUpload({ onUpload, onClear }: ImageUpload) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDropAccepted: (files) => {
      onUpload(files[0]);
      setFiles(files);
    },
  });

  return (
    <Box position="relative" width="100%" height="100%">
      {files.length > 0 ? (
        <>
          <Image
            src={URL.createObjectURL(files[0])}
            alt="Uploaded Image"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              zIndex: -1,
            }}
          />
          <IconButton
            style={{
              position: "absolute",
              right: "-40px",
              top: "0",
              cursor: "pointer",
            }}
            aria-label="Clear"
            onClick={() => {
              setFiles([]);
              onClear();
            }}
          >
            <Cross1Icon width="16" height="16" />
          </IconButton>
        </>
      ) : (
        <Flex
          {...getRootProps({ className: "dropzone" })}
          style={{
            cursor: "pointer",
            border: "1px dashed var(--gray-a7)",
            borderRadius: "8px",
            backgroundColor: "var(--gray-a1)",
            height: "100%",
            width: "100%",
            padding: "16px",
          }}
          align="center"
          justify="center"
          direction="column"
          gap="2"
        >
          <input {...getInputProps()} />
          <Text size="4" align="center">
            Drag &apos;n&apos; drop some files here, or click to select files
          </Text>
          <Text size="2" align="center">
            (Only *.jpeg, *.webp and *.png images will be accepted)
          </Text>
        </Flex>
      )}
    </Box>
  );
}
