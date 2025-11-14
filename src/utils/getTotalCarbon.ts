import { IdentifiedFood } from "@/modal/foodAnalyzer";

const getTotalCarbon = (identifiedFood: IdentifiedFood): number => {
  if (!identifiedFood.food) {
    return 0;
  }

  const { co2PerKg } = identifiedFood.food;

  return identifiedFood.estimatedWeight * co2PerKg;
};

export default getTotalCarbon;
