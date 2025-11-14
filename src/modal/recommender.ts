import { Food } from "./food";

export interface RecommendationResult {
  recommendations: {
    originalFoodId: string;
    alternative: {
      foodId: string;
      food?: Food;
    };
    confidence: number;
  }[];
  confidence: number;
  notes: string;
}
