/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const fs = require("fs");

const database = "work_infinity_x_dev";

// The current database to use.
use(database);

const readDataFromLocalFileAndUpdateToDB = async () => {
    try {
        const countryMappedRes = fs.readFileSync(
            "/Users/trungdx/Code/mongodb-scripts/json/tripfizer/fully-mapped-data.json",
            () => {}
        );
        const stateDatabaseRes = fs.readFileSync(
            "/Users/trungdx/Code/mongodb-scripts/json/states/states.json",
            () => {}
        );
        const stateData = JSON.parse(stateDatabaseRes);
        const countryMappedData = JSON.parse(countryMappedRes) ?? [];
        const mappedStates = stateData.map((state, index) => {
            const {
                id,
                name,
                country_id,
                country_code,
                country_name,
                state_code,
                latitude,
                longitude,
            } = state || {};
            const foundCountry = countryMappedData.find(
                (i) => country_code === i?.infoData?.iso
            );

            const { _id, infoData: infoDataCountry } = foundCountry || {};
            const infoData = {
                name,
                code: state_code,
            };
            const inCountryData = {
                id: { $oid: _id?.$oid },
                name: country_name,
                code: country_code,
            };
            const newGeoData = {
                point:
                    longitude && latitude
                        ? {
                              type: "Point",
                              coordinates: [
                                  parseFloat(longitude),
                                  parseFloat(latitude),
                              ],
                          }
                        : undefined,
            };

            return {
                type: "STATE",
                infoData,
                inCountry: inCountryData,
                geoData: newGeoData,
            };
        });
        const listJson = JSON.stringify(mappedStates);
        await fs.writeFileSync("json/fully-mapped-sate-data.json", listJson);
    } catch (error) {
        console.error(JSON.stringify(error));
    }
};

readDataFromLocalFileAndUpdateToDB();
