# Sunrise

This project calls https://sunrise-sunset.org/api to fetch the sunrise, sunset and day length times for geographic coordinates.

The script fetches the times for a 100 locations and then returns the length of the day for the location with the earliest sunrise. Excluding those where the sun doesn't rise.

To run the script from the command line use: npm run start.

This will take a moment as only 5 requests are made at time.
