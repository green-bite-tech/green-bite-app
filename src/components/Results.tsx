import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Heading,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnalysisResult } from "@/modal/foodAnalyzer";
import getTotalCarbon from "@/utils/getTotalCarbon";
import { Food } from "@/modal/food";
import { useEffect, useState } from "react";
import { GetRecommendations } from "./GetRecommendations";
import { RecommendationResult } from "@/modal/recommender";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { FoodDisplay } from "./FoodDisplay";

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

  const foodItems =
    scanResult?.identifiedFoods.map((identifiedFood) => {
      const alternativeFood = recommendation?.recommendations.find(
        (recommendation) =>
          recommendation.originalFoodId === (identifiedFood.food?.id || "")
      );

      return {
        ...identifiedFood,
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
                <Table.ColumnHeaderCell>Scan Confidence</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {foodItems
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((food, index) => (
                  <Table.Row key={index}>
                    {!recommendation && (
                      <Table.Cell style={{ verticalAlign: "middle" }}>
                        <Checkbox
                          size="1"
                          onCheckedChange={(state) =>
                            onCheck(state as boolean, food.food)
                          }
                          checked={selectedFoods.includes(food.food?.id || "")}
                          disabled={!food.food}
                        />
                      </Table.Cell>
                    )}
                    <Table.RowHeaderCell>
                      {food.food ? (
                        <Flex direction="row" align="center" gap="2">
                          <FoodDisplay
                            food={food.food}
                            strikeThrough={!!food.alternative}
                          />
                          {food.alternative && (
                            <>
                              <Flex
                                width="12px"
                                height="12px"
                                justify="center"
                                align="center"
                              >
                                <ArrowRightIcon />
                              </Flex>
                              <FoodDisplay food={food.alternative} />
                            </>
                          )}
                        </Flex>
                      ) : (
                        <FoodDisplay
                          food={
                            {
                              name: food.name,
                              category: food.category,
                            } as Food
                          }
                        />
                      )}
                    </Table.RowHeaderCell>
                    <Table.Cell align="right">
                      {food.estimatedWeight} kg
                    </Table.Cell>
                    <Table.Cell align="right">
                      <Flex
                        direction="column"
                        align="center"
                        gap="2"
                        justify="end"
                      >
                        <Tooltip
                          content="High carbon footprint! Think about replacing this ingredient next time with a more sustainable option."
                          hidden={
                            (food.food?.co2PerKg || 0) <
                              CARBON_PER_KG_THRESHOLD || !!food.alternative
                          }
                        >
                          <Badge
                            size="3"
                            color={
                              (food.food?.co2PerKg || 0) >=
                              CARBON_PER_KG_THRESHOLD
                                ? "red"
                                : "green"
                            }
                            style={{
                              textDecoration: food.alternative
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {food.food
                              ? `${getTotalCarbon(
                                  food.food.co2PerKg,
                                  food.estimatedWeight
                                ).toFixed(2)} kg`
                              : "-"}
                          </Badge>
                        </Tooltip>

                        {food.alternative && (
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
                              {getTotalCarbon(
                                food.alternative.co2PerKg,
                                food.estimatedWeight
                              ).toFixed(2)}{" "}
                              kg
                            </Badge>
                          </>
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell align="right">
                      <Tooltip
                        content={"Low confidence - results may be inaccurate."}
                        hidden={food.confidence > CONFIDENCE_THRESHOLD}
                      >
                        <Badge
                          size="3"
                          color={
                            food.confidence > CONFIDENCE_THRESHOLD
                              ? "green"
                              : "orange"
                          }
                        >
                          {(food.confidence * 100).toFixed(0)}%
                        </Badge>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))}

              <Table.Row>
                {!recommendation && <Table.ColumnHeaderCell />}
                <Table.ColumnHeaderCell colSpan={2}>
                  Total
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell align="right">
                  {scanResult.identifiedFoods
                    .reduce(
                      (total, food) =>
                        total +
                        getTotalCarbon(
                          food.food?.co2PerKg || 0,
                          food.estimatedWeight
                        ),
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
            originalFoodIds={scanResult.identifiedFoods
              .map((food) => food.food?.id || "")
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
