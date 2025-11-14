export enum FoodCategory {
  SEAFOOD = "seafood",
  MEAT = "meat",
  VEGETABLE = "vegetable",
  GRAIN = "grain",
  FRUIT = "fruit",
  LEGUME = "legume",
  NUT = "nut",
  OIL = "oil",
}

export interface Food {
  id: string;
  name: string;
  emoji: string;
  co2PerKg: number;
  landUse: number;
  farmOperations: number;
  processing: number;
  transportation: number;
  packaging: number;
  category: FoodCategory;
}
