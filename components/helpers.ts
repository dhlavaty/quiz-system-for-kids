export const removeDuplicates = (input: number[]): number[] => {
  // remove duplicates
  return input.filter((v, i) => input.indexOf(v) === i);
};

export const toStringArray = (input: number[]): string[] => {
  return input.map(strValue => strValue.toString());
};

export const sortArray = (input: number[]): number[] => {
  return input.sort((a, b) => a - b);
};
