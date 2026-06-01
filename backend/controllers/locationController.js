import LocationPricing from "../models/LocationPricing.js";

export const getMarkupFromState = async (
  state = ""
) => {
  console.log("State Received:", state);

  const allLocations =
    await LocationPricing.find();

  console.log(
    "All Locations:",
    allLocations
  );

  const location =
    await LocationPricing.findOne({
      state: {
        $regex: new RegExp(
          `^${state}$`,
          "i"
        ),
      },
    });

  console.log(
    "Location Found:",
    location
  );

  return (
    location?.markupPercentage ||
    0
  );
};