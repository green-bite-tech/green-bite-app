import { Food, FoodCategory } from "./food";

export interface IdentifiedFood {
  category: FoodCategory;
  confidence: number;
  estimatedWeight: number;
  food?: Food;
  name: string;
}

export interface AnalysisResult {
  identifiedFoods: IdentifiedFood[];
  notes: string;
  scanConfidence: number;
  totalEstimatedCo2: number;
}
