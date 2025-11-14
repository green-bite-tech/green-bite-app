"use client";

import ImageUpload from "@/components/ImageUpload";
import { Results } from "@/components/Results";
import { API_BASE_URL } from "@/constants/api";
import { AnalysisResult } from "@/modal/foodAnalyzer";
import { Box, Button, Flex, Heading, Tooltip } from "@radix-ui/themes";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Box
      style={{ background: "var(--gray-a2)" }}
      minHeight="100vh"
      pt="9"
      pb="9"
    >
      <Heading size="9" align="center" as="h1">
        GreenBite
      </Heading>

      <Heading size="6" align="center" as="h2" mt="6">
        Track your carbon footprint in food with ease.
      </Heading>

      <Box
        width="80px"
        height="8px"
        mx="auto"
        mt="6"
        style={{ backgroundColor: "var(--crimson-9)", borderRadius: "8px" }}
      ></Box>

      <Flex
        justify="center"
        gap="4"
        direction="column"
        align="center"
        mt="9"
        mb="9"
      >
        <Box width="500px" height="300px">
          <ImageUpload
            onUpload={(file) => setImage(file)}
            onClear={() => {
              setImage(null);
              setScanResult(null);
            }}
          />
        </Box>
        {!scanResult && !isLoading && (
          <Tooltip
            content="Upload an image to calculate your carbon footprint"
            side="top"
            hidden={!!image}
          >
            <Button
              disabled={!image}
              onClick={async () => {
                if (!image) return;

                setScanResult(null);
                setIsLoading(true);
                const formData = new FormData();
                formData.append("image", image);
                const res = await fetch(
                  `${API_BASE_URL}/food-analyzer/scan-image`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );
                setScanResult(await res.json());
                setIsLoading(false);
              }}
              style={{ cursor: image ? "pointer" : "not-allowed" }}
            >
              Get carbon footprint
            </Button>
          </Tooltip>
        )}
        <Results scanResult={scanResult} isLoading={isLoading} />
      </Flex>
    </Box>
  );
}
