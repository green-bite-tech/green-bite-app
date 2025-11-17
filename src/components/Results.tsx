import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Heading,
  HoverCard,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnalysisResult } from "@/modal/foodAnalyzer";
import getAbsoluteCarbon from "@/utils/getAbsoluteCarbon";
import { Food } from "@/modal/food";
import { useEffect, useState } from "react";
import { GetRecommendations } from "./GetRecommendations";
import { RecommendationResult } from "@/modal/recommender";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { FoodDisplay } from "./FoodDisplay";
import getTotalGreenHouseGasEmissionsPerKilogram from "@/utils/getTotalGreenHouseGasEmissionsPerKilogram";
import { FoodDetail } from "./FoodDetail";

interface ResultsProps {
  scanResult: AnalysisResult | null;
  isLoading?: boolean;
}

const CARBON_PER_KG_THRESHOLD = 5; // kg CO2e per kg
const CONFIDENCE_THRESHOLD = 0.8; // 80%

export const Results = ({ isLoading = false, scanResult }: ResultsProps) => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [recommendation, setRecommendation] =
    useState<RecommendationResult | null>(null);

  useEffect(() => {
    if (!scanResult) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFoods([]);
      setRecommendation(null);
    }
  }, [scanResult]);

  const onCheck = (state: boolean, food?: Food) => {
    if (!food) return;

    if (state) {
      const newSelected = [...selectedFoods, food.id];
      setSelectedFoods(newSelected);
    } else {
      const newSelected = selectedFoods.filter((id) => id !== food.id);
      setSelectedFoods(newSelected);
    }
  };

  const results =
    scanResult?.results.map((result) => {
      const alternativeFood = recommendation?.recommendations.find(
        (recommendation) =>
          recommendation.originalFoodId === (result.food?.id || "")
      );

      return {
        ...result,
        alternative: alternativeFood?.alternative.food
          ? alternativeFood.alternative.food
          : null,
      };
    }) || [];

  if (!scanResult && !isLoading) return null;

  return (
    <Box
      width="600px"
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
                {!recommendation && <Table.ColumnHeaderCell />}
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Weight</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total kg CO₂e</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {results
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((result, index) => (
                  <Table.Row key={index}>
                    {!recommendation && (
                      <Table.Cell style={{ verticalAlign: "middle" }}>
                        <Checkbox
                          size="1"
                          onCheckedChange={(state) =>
                            onCheck(state as boolean, result.food)
                          }
                          checked={selectedFoods.includes(
                            result.food?.id || ""
                          )}
                          disabled={!result.food}
                        />
                      </Table.Cell>
                    )}
                    <Table.RowHeaderCell>
                      {result.food ? (
                        <Flex direction="row" align="center" gap="2">
                          <FoodDisplay
                            food={result.food}
                            strikeThrough={!!result.alternative}
                          />
                          {result.alternative && (
                            <>
                              <Flex
                                width="12px"
                                height="12px"
                                justify="center"
                                align="center"
                              >
                                <ArrowRightIcon />
                              </Flex>
                              <FoodDisplay food={result.alternative} />
                            </>
                          )}
                        </Flex>
                      ) : (
                        <FoodDisplay
                          food={
                            {
                              name: result.name,
                              category: result.category,
                            } as Food
                          }
                        />
                      )}
                    </Table.RowHeaderCell>
                    <Table.Cell align="right">
                      <Flex direction="column" align="end" gap="1">
                        <Text size="2" weight="bold">
                          {result.estimatedWeight} kg
                        </Text>
                        <Tooltip
                          content={
                            result.confidence > CONFIDENCE_THRESHOLD
                              ? "High scan confidence - results are likely accurate."
                              : "Low scan confidence - results may be inaccurate."
                          }
                        >
                          <Badge
                            size="1"
                            color={
                              result.confidence > CONFIDENCE_THRESHOLD
                                ? "green"
                                : "orange"
                            }
                          >
                            {(result.confidence * 100).toFixed(0)}%
                          </Badge>
                        </Tooltip>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell align="right">
                      <Flex
                        direction="column"
                        align="end"
                        gap="2"
                        justify="center"
                        height="100%"
                      >
                        <Tooltip
                          content="High carbon footprint! Think about replacing this ingredient next time with a more sustainable option."
                          hidden={
                            getTotalGreenHouseGasEmissionsPerKilogram(
                              result.food
                            ) < CARBON_PER_KG_THRESHOLD || !!result.alternative
                          }
                        >
                          <Badge
                            size="3"
                            color={
                              getTotalGreenHouseGasEmissionsPerKilogram(
                                result.food
                              ) >= CARBON_PER_KG_THRESHOLD
                                ? "red"
                                : "green"
                            }
                            style={{
                              textDecoration: result.alternative
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {result.food
                              ? `${getAbsoluteCarbon(
                                  result.estimatedWeight,
                                  result.food
                                ).toFixed(2)} kg`
                              : "-"}
                          </Badge>
                        </Tooltip>

                        {result.alternative && (
                          <>
                            <Flex
                              width="12px"
                              height="12px"
                              justify="center"
                              align="center"
                            >
                              <ArrowDownIcon />
                            </Flex>
                            <Badge size="3" color="green">
                              {getAbsoluteCarbon(
                                result.estimatedWeight,
                                result.alternative
                              ).toFixed(2)}{" "}
                              kg
                            </Badge>
                          </>
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell justify="end">
                      <Flex height="100%" align="center" justify="end">
                        {result.food && (
                          <HoverCard.Root>
                            <HoverCard.Trigger>
                              <InfoCircledIcon width="18" height="18" />
                            </HoverCard.Trigger>
                            <HoverCard.Content maxWidth="600px">
                              <FoodDetail
                                originalFood={result.food}
                                alternativeFood={result.alternative}
                              />
                            </HoverCard.Content>
                          </HoverCard.Root>
                        )}
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}

              <Table.Row>
                {!recommendation && <Table.ColumnHeaderCell />}
                <Table.ColumnHeaderCell colSpan={2}>
                  Total
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell align="right">
                  {scanResult.results
                    .reduce(
                      (total, result) =>
                        total +
                        getAbsoluteCarbon(result.estimatedWeight, result.food),
                      0
                    )
                    .toFixed(2)}{" "}
                  kg
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="right">
                  {(scanResult.scanConfidence * 100).toFixed(0)}%
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <GetRecommendations
            selectedFoods={selectedFoods}
            originalFoodIds={scanResult.results
              .map((result) => result.food?.id || "")
              .filter((id) => id !== "")}
            recommendation={recommendation}
            onLoad={setRecommendation}
          />
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
