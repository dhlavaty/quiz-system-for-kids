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

export const getRandomBool = (): boolean => {
  return getRandomIntInclusive(1, 10) > 5;
};
