const {
  getMultipleSunriseSunsets,
} = require("./connectors/sunrise-sunset.connector");
const {
  coordinatesArrayGenerator,
} = require("./services/coordinates-generator.service");

const findDayLengthOfEarliestSunrise = async (
  numberOfPoints,
  requestLimit = 5
) => {
  try {
    const coordinates = coordinatesArrayGenerator(numberOfPoints);
    const solarData = await getMultipleSunriseSunsets(
      coordinates,
      requestLimit
    );
    // Filter out locations where the sun doesn't rise
    const filteredSolarData = solarData.filter(
      (location) =>
        Date.parse(location.sunrise) > Date.parse("1970-01-01T00:00:01")
    );
    filteredSolarData.sort((a, b) => {
      return Date.parse(a["sunrise"]) - Date.parse(b["sunrise"]);
    });

    const dayLength = new Date(filteredSolarData.shift().day_length * 1000)
      .toISOString()
      .substr(11, 8);
    console.log(dayLength);
  } catch (err) {
    throw err;
  }
};

findDayLengthOfEarliestSunrise(100, 5).catch((err) => {
  console.error(err.stack);
});
