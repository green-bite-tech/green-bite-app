const formatNumber = (num: number | undefined, unit: string): string => {
  if (!num) {
    return `- ${unit}`;
  }

  return `${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${unit}`;
};

export default formatNumber;
