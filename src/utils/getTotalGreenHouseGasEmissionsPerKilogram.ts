import { Food } from "@/modal/food";

const getTotalGreenHouseGasEmissionsPerKilogram = (food?: Food): number => {
  if (!food) return 0;

  return (
    (food.greenhouseGasEmissionsAnimalFeedPerKilogram || 0) +
    (food.greenhouseGasEmissionsFarmPerKilogram || 0) +
    (food.greenhouseGasEmissionsLandUsePerKilogram || 0) +
    (food.greenhouseGasEmissionsLossesPerKilogram || 0) +
    (food.greenhouseGasEmissionsPackagingPerKilogram || 0) +
    (food.greenhouseGasEmissionsProcessingPerKilogram || 0) +
    (food.greenhouseGasEmissionsRetailPerKilogram || 0) +
    (food.greenhouseGasEmissionsTransportPerKilogram || 0)
  );
};

export default getTotalGreenHouseGasEmissionsPerKilogram;
