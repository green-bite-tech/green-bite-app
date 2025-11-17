import { Food } from "@/modal/food";
import getTotalGreenHouseGasEmissionsPerKilogram from "./getTotalGreenHouseGasEmissionsPerKilogram";

const getAbsoluteCarbon = (estimatedWeight: number, food?: Food): number => {
  return estimatedWeight * getTotalGreenHouseGasEmissionsPerKilogram(food);
};

export default getAbsoluteCarbon;
