export const generateID = () =>
  [...Array(30)].map(() => Math.random().toString(36)[2]).join("");

export const fixAndReturnNumber = (input) => {
  // Check if the input is a string and try to cast it to a number
  if (typeof input === "string") {
    input = Number(input);
  }

  // If input is not a number after conversion, return null
  if (isNaN(input)) {
    return null;
  }

  // Check if the number is an integer and if it's one of the rounded numbers
  if (
    Number.isInteger(input) &&
    (input === 50 || input === 20 || input === 100 || input === 2)
  ) {
    return input;
  }

  // If the number has a decimal part
  if (!Number.isInteger(input)) {
    // If the number is a decimal starting with 0, return 0
    if (input < 1 && input > 0) {
      return 0;
    }
    // Otherwise, round the number to one decimal place
    return Math.round(input * 10) / 10;
  }

  // For any other cases, return the input as it is
  return input;
};

// Exemples
// console.log(fixAndReturnNumber("5.199540347293157")); // Output: 5.2
// console.log(fixAndReturnNumber(50)); // Output: 50
// console.log(fixAndReturnNumber("0.3247832")); // Output: 0
// console.log(fixAndReturnNumber(0.34776)); // Output: 10.3
// console.log(fixAndReturnNumber(2)); // Output: 2
