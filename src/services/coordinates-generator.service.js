const coordinatesGenerator = () => {
  const latitude = Math.random() * 180 - 90;
  const longitude = Math.random() * 360 - 180;
  const coordinates = [latitude, longitude];
  return coordinates;
};

const coordinatesArrayGenerator = (numberOfPoints) => {
  if (isNaN(numberOfPoints) || numberOfPoints < 1) {
    throw new Error("Parameter must be a positive number");
  } else {
    const coordinatesArray = [];
    for (let i = 0; i < numberOfPoints; i++) {
      coordinatesArray.push(coordinatesGenerator());
    }
    return coordinatesArray;
  }
};

module.exports = { coordinatesArrayGenerator };
