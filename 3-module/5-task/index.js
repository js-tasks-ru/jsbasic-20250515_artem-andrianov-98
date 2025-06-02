function getMinMax(str) {
  let numbersArr = str
        .split(' ')
        .map(part => parseFloat(part))
        .filter(num => !isNaN(num));
  return {
    min: Math.min(...numbersArr),
    max: Math.max(...numbersArr)
  };
}
