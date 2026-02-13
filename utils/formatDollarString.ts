export const formatDollarString = (input: string | number | undefined) => {
  if (input === undefined || input === "") return "";
  const num = Number(input);
  if (Number.isNaN(num) || num === 0) return "";
  return `$ ${num.toFixed(2)}`;
};
