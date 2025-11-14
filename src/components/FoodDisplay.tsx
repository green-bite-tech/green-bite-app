import { Food } from "@/modal/food";
import { Badge, Flex, Text } from "@radix-ui/themes";

interface FoodDisplayProps {
  food: Food;
  strikeThrough?: boolean;
}

export const FoodDisplay = ({
  food,
  strikeThrough = false,
}: FoodDisplayProps) => {
  return (
    <Flex direction="column" align="start" gap="1">
      <Text
        size="2"
        weight="bold"
        style={{ textDecoration: strikeThrough ? "line-through" : "none" }}
      >
        {food.name}
      </Text>
      <Badge
        size="1"
        color="gray"
        style={{ textDecoration: strikeThrough ? "line-through" : "none" }}
      >
        {food.category}
      </Badge>
    </Flex>
  );
};
