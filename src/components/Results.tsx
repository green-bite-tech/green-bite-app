import {
  Badge,
  Box,
  Flex,
  Heading,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ScanResult } from "@/modal/food";

interface ResultsProps {
  scanResult: ScanResult | null;
  isLoading?: boolean;
}

export const Results = ({ scanResult, isLoading = false }: ResultsProps) => {
  if (!scanResult && !isLoading) return null;

  return (
    <Box
      width="500px"
      minHeight="400px"
      style={{ border: "1px solid var(--gray-a7)", borderRadius: "8px" }}
      p="4"
    >
      {scanResult ? (
        <>
          <Heading size="4" as="h3" mb="2">
            Scan Results
          </Heading>
          <Table.Root variant="ghost">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  Estimated Weight
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total kg CO₂e</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Scan Confidence</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {scanResult.identifiedFoods
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((food, index) => (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell>
                      <Text size="2" weight="bold">
                        {food.name}
                      </Text>
                      <br />
                      <Text size="2" color="gray">
                        {food.category}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>{food.estimatedWeight} kg</Table.Cell>
                    <Table.Cell>
                      <Tooltip
                        content="High carbon footprint! Think about replacing this ingredient next time with a more sustainable option."
                        hidden={food.totalCo2 <= food.estimatedWeight * 2}
                      >
                        <Badge
                          size="3"
                          color={
                            food.totalCo2 > food.estimatedWeight * 2
                              ? "red"
                              : "green"
                          }
                        >
                          {food.totalCo2
                            ? `${food.totalCo2.toFixed(2)} kg`
                            : "-"}
                        </Badge>
                      </Tooltip>
                    </Table.Cell>
                    <Table.Cell>
                      <Tooltip
                        content={"Low confidence - results may be inaccurate."}
                        hidden={food.confidence > 0.8}
                      >
                        <Badge
                          size="3"
                          color={food.confidence > 0.8 ? "green" : "orange"}
                        >
                          {(food.confidence * 100).toFixed(0)}%
                        </Badge>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))}

              <Table.Row>
                <Table.ColumnHeaderCell colSpan={2}>
                  Total
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>
                  {scanResult.identifiedFoods
                    .reduce((total, food) => total + (food.totalCo2 || 0), 0)
                    .toFixed(2)}{" "}
                  kg
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          height="100%"
          width="100%"
          direction="column"
        >
          <DotLottieReact
            src="https://lottie.host/687017c5-f9cc-42e3-93d9-96ceaf6a8c75/6ycwmZpzUa.lottie"
            loop
            autoplay
          />
          <Heading size="4" align="center" as="h3">
            Analyzing your image...
          </Heading>
          <Text size="2" align="center" mt="2">
            Hold tight! We are crunching the numbers to calculate your carbon
            footprint.
          </Text>
        </Flex>
      )}
    </Box>
  );
};
