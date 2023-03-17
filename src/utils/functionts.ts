export function getAverage(numbers: number[]): number {
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const avg = sum / numbers.length;
  return avg;
}
