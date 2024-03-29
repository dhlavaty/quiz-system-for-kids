/**
 * Remove duplicate numbers from array
 * @param input
 */
export const removeDuplicates = (input: number[]): number[] => {
  //
  return input.filter((v, i) => input.indexOf(v) === i);
};

export const toStringArray = (input: number[]): string[] => {
  return input.map((strValue) => strValue.toString());
};

export const toStringArrayWithPostfix = (input: number[], postfix: string): string[] => {
  return input.map((strValue) => `${strValue}${postfix}`);
};

export const toStringArrayWithPrefix = (input: number[], prefix: string): string[] => {
  return input.map((strValue) => `${prefix}${strValue}`);
};

export const sortArray = (input: number[]): number[] => {
  return input.sort((a, b) => a - b);
};

/**
 * expected output: 0, 1, 2, ... max-1
 */
export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

/**
 * if input is `getRandomIntInclusive(3,5)`...
 * ...expected output: 3, 4 or 5
 */
export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

/**
 * if input is `getRandomDecimal(3,5,2)`...
 * ...expected output from 3.00 to 4.99
 */
export const getRandomDecimal = (min: number, max: number, maxDecimals: number): number => {
  return roundDecimal(Math.random() * (max - min + 1) + min, getRandomIntInclusive(0, maxDecimals));
};

export const roundDecimal = (input: number, maxDecimals: number): number => {
  return parseFloat(input.toFixed(maxDecimals));
};

export const getRandomBool = (): boolean => {
  return getRandomIntInclusive(1, 10) > 5;
};
