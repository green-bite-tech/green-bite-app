import { Food } from "@/modal/food";
import { Box, DataList, Heading, Tabs } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

interface FoodDetailProps {
  originalFood: Food;
  alternativeFood?: Food | null;
}

export const FoodDetail = ({
  originalFood,
  alternativeFood,
}: FoodDetailProps) => {
  const data = [
    {
      stage: "Land Use",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsLandUsePerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsLandUsePerKilogram?.toFixed(2),
    },
    {
      stage: "Farm",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsFarmPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsFarmPerKilogram?.toFixed(2),
    },
    {
      stage: "Animal Feed",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsAnimalFeedPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsAnimalFeedPerKilogram?.toFixed(
          2
        ),
    },
    {
      stage: "Processing",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsProcessingPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsProcessingPerKilogram?.toFixed(
          2
        ),
    },
    {
      stage: "Transport",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsTransportPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsTransportPerKilogram?.toFixed(2),
    },
    {
      stage: "Retail",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsRetailPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsRetailPerKilogram?.toFixed(2),
    },
    {
      stage: "Packaging",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsPackagingPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsPackagingPerKilogram?.toFixed(2),
    },
    {
      stage: "Losses",
      emissionsOriginalFood:
        originalFood.greenhouseGasEmissionsLossesPerKilogram?.toFixed(2),
      emissionsAlternativeFood:
        alternativeFood?.greenhouseGasEmissionsLossesPerKilogram?.toFixed(2),
    },
  ];

  return (
    <Box width="500px" height="400px">
      <Tabs.Root defaultValue="greenhouseGasEmissionsPerKilogram">
        <Tabs.List size="1">
          <Tabs.Trigger value="greenhouseGasEmissionsPerKilogram">
            Greenhouse Gas Emissions per Kilogram
          </Tabs.Trigger>
          <Tabs.Trigger value="waterUse">Water Use</Tabs.Trigger>
          <Tabs.Trigger value="landUse">Land Use</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="greenhouseGasEmissionsPerKilogram">
            <Box width="500px" height="350px" position="relative">
              <BarChart
                layout="vertical"
                style={{ width: "500px", height: "350px" }}
                margin={{ left: 40, right: 40 }}
                responsive
                data={data}
              >
                <Legend />
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  fontSize="12"
                  unit="kg CO₂e"
                  domain={[0, "auto"]}
                />
                <ReferenceLine x={0} stroke="#000" strokeWidth={1} />
                <YAxis
                  type="category"
                  dataKey="stage"
                  fontSize="12"
                  width={120}
                />
                <Tooltip contentStyle={{ fontSize: "10" }} />
                <Bar
                  dataKey="emissionsOriginalFood"
                  name="Original Food"
                  fill="var(--gray-a8)"
                  isAnimationActive={true}
                />
                {alternativeFood && (
                  <Bar
                    dataKey="emissionsAlternativeFood"
                    name="Alternative Food"
                    fill="var(--green-a8)"
                    isAnimationActive={true}
                  />
                )}
              </BarChart>
            </Box>
          </Tabs.Content>

          <Tabs.Content value="waterUse">
            <Heading mt="2" size="2">
              Original Food
            </Heading>
            <DataList.Root mt="4">
              <DataList.Item>
                <DataList.Label>Per Kilogram</DataList.Label>
                <DataList.Value>
                  {originalFood.waterUsePerKilogram?.toFixed(2)} L/kg
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Per 1000 Kilocalories</DataList.Label>
                <DataList.Value>
                  {originalFood.waterUsePer1000Kilocalories?.toFixed(2)} L/1000
                  kcal
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Per 100 Grams of Protein</DataList.Label>
                <DataList.Value>
                  {originalFood.waterUsePer100GramsOfProtein?.toFixed(2)} L/100
                  g
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>

            {alternativeFood && (
              <>
                <Heading size="2" mt="6">
                  Alternative Food
                </Heading>
                <DataList.Root mt="4">
                  <DataList.Item>
                    <DataList.Label>Per Kilogram</DataList.Label>
                    <DataList.Value>
                      {alternativeFood.waterUsePerKilogram?.toFixed(2)} L/kg
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Per 1000 Kilocalories</DataList.Label>
                    <DataList.Value>
                      {alternativeFood.waterUsePer1000Kilocalories?.toFixed(2)}{" "}
                      L/1000 kcal
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Per 100 Grams of Protein</DataList.Label>
                    <DataList.Value>
                      {alternativeFood.waterUsePer100GramsOfProtein?.toFixed(2)}{" "}
                      L/100 g
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </>
            )}
          </Tabs.Content>

          <Tabs.Content value="landUse">
            <Heading mt="2" size="2">
              Original Food
            </Heading>
            <DataList.Root mt="4">
              <DataList.Item>
                <DataList.Label>Per Kilogram</DataList.Label>
                <DataList.Value>
                  {originalFood.landUsePerKilogram?.toFixed(2) || "-"} m²/kg
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Per 1000 Kilocalories</DataList.Label>
                <DataList.Value>
                  {originalFood.landUsePer1000Kilocalories?.toFixed(2) || "-"}{" "}
                  m²/1000 kcal
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Per 100 Grams of Protein</DataList.Label>
                <DataList.Value>
                  {originalFood.landUsePer100GramsOfProtein?.toFixed(2) || "-"}{" "}
                  m²/100 g
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>

            {alternativeFood && (
              <>
                <Heading size="2" mt="6">
                  Alternative Food
                </Heading>
                <DataList.Root mt="4">
                  <DataList.Item>
                    <DataList.Label>Per Kilogram</DataList.Label>
                    <DataList.Value>
                      {alternativeFood.landUsePerKilogram?.toFixed(2) || "-"}{" "}
                      m²/kg
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Per 1000 Kilocalories</DataList.Label>
                    <DataList.Value>
                      {alternativeFood.landUsePer1000Kilocalories?.toFixed(2) ||
                        "-"}{" "}
                      m²/1000 kcal
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Per 100 Grams of Protein</DataList.Label>
                    <DataList.Value>
                      {alternativeFood.landUsePer100GramsOfProtein?.toFixed(
                        2
                      ) || "-"}{" "}
                      m²/100 g
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </>
            )}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
};
