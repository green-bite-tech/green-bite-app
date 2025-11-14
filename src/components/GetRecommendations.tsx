import { API_BASE_URL } from "@/constants/api";
import { RecommendationResult } from "@/modal/recommender";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

interface GetRecommendationsProps {
  originalFoodIds: string[];
  recommendation: RecommendationResult | null;
  selectedFoods: string[];
  onLoad: (recommendation: RecommendationResult | null) => void;
}
export const GetRecommendations = ({
  originalFoodIds,
  recommendation,
  selectedFoods,
  onLoad,
}: GetRecommendationsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    if (recommendation) {
      onLoad(null);
      return;
    }

    setIsLoading(true);
    const res = await fetch(`${API_BASE_URL}/recommender/alternatives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalFoodIds,
        alternativeFoodIds: selectedFoods,
      }),
    });
    if (res.status === 201) {
      const recommendation: RecommendationResult = await res.json();

      setIsLoading(false);
      onLoad(recommendation);
    } else {
      setIsLoading(false);
      alert(
        "Nothing to improve! All selected foods are already low-carbon alternatives."
      );
    }
  };

  return (
    <Flex justify="between" align="center" mt="6" gap="4">
      <Flex direction="column" gap="1">
        <Text size="3">Select food you want to find alternatives for</Text>
        <Text size="2" color="gray" mb="4">
          In the list above, the food that has a high footprint is highlighted
          in red. Select the food items you want to get alternatives for.
        </Text>
      </Flex>
      <Flex width="300px" justify="end" position="relative">
        {isLoading ? (
          <DotLottieReact
            src="https://lottie.host/687017c5-f9cc-42e3-93d9-96ceaf6a8c75/6ycwmZpzUa.lottie"
            loop
            autoplay
          />
        ) : (
          <Button
            style={{ cursor: "pointer" }}
            disabled={selectedFoods.length === 0}
            onClick={getRecommendations}
            loading={isLoading}
          >
            {recommendation ? "Clear" : "Get Recommendations"}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
