const getTotalCarbon = (co2PerKg: number, estimatedWeight: number): number => {
  return estimatedWeight * co2PerKg;
};

export default getTotalCarbon;
