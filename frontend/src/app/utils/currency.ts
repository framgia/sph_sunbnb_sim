export function formatCurrency(
  sign: string,
  decimalPlaces: number,
  value: number
): string {
  const options = {
    style: "currency",
    currency: sign,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  };

  return new Intl.NumberFormat("en-US", options).format(value);
}
