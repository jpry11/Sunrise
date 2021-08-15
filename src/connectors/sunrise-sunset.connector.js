const fetch = require("node-fetch");

const getSunriseSunset = async (dataPoint) => {
  try {
    const url = `https://api.sunrise-sunset.org/json?lat=${dataPoint[0]}&lng=${dataPoint[1]}&formatted=0`;
    const options = {
      method: "Get",
    };

    const response = await fetch(url, options);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(
        `Sunrise-Sunset API responded with status: ${response.status}`
      );
    }
  } catch (err) {
    throw err;
  }
};

const getMultipleSunriseSunsets = async (dataPointsArray, limit = 5) => {
  try {
    if (isNaN(limit) || limit < 1) {
      throw new Error("Parameter must be a positive integer");
    } else {
      let results = [];
      while (dataPointsArray.length > 0) {
        const promises = dataPointsArray
          .slice(0, limit)
          .map(async (dataPoint) => {
            dataPointsArray = dataPointsArray.filter((data) => {
              return data !== dataPoint;
            });
            const response = await getSunriseSunset(dataPoint);
            results.push(response.results);
          });
        await Promise.all(promises);
      }
      return results;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { getMultipleSunriseSunsets };
