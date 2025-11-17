export enum FoodCategory {
  SEAFOOD = "seafood",
  MEAT = "meat",
  VEGETABLE = "vegetable",
  GRAIN = "grain",
  FRUIT = "fruit",
  LEGUME = "legume",
  NUT = "nut",
  OIL = "oil",
  OTHER = "other",
}

export interface Food {
  category: FoodCategory;
  eutrophyingEmissionsPer1000Kilocalories?: number;
  eutrophyingEmissionsPer100GramsOfProtein?: number;
  eutrophyingEmissionsPerKilogram?: number;
  waterUsePer1000Kilocalories?: number;
  waterUsePer100GramsOfProtein?: number;
  waterUsePerKilogram?: number;
  greenhouseGasEmissionsAnimalFeedPerKilogram?: number;
  greenhouseGasEmissionsFarmPerKilogram?: number;
  greenhouseGasEmissionsLandUsePerKilogram?: number;
  greenhouseGasEmissionsLossesPerKilogram?: number;
  greenhouseGasEmissionsPackagingPerKilogram?: number;
  greenhouseGasEmissionsPer1000Kilocalories?: number;
  greenhouseGasEmissionsPer100GramsOfProtein?: number;
  greenhouseGasEmissionsProcessingPerKilogram?: number;
  greenhouseGasEmissionsRetailPerKilogram?: number;
  greenhouseGasEmissionsTransportPerKilogram?: number;
  id: string;
  landUsePer1000Kilocalories?: number;
  landUsePer100GramsOfProtein?: number;
  landUsePerKilogram?: number;
  name: string;
  scarcityWeightedWaterUsePer1000Kilocalories?: number;
  scarcityWeightedWaterUsePer100GramsOfProtein?: number;
  scarcityWeightedWaterUsePerKilogram?: number;
}
