/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const fs = require("fs");

const database = "tripfizer-dev";

// The current database to use.
use(database);

const readDataFromLocalFileAndUpdateToDB = async () => {
    try {
        const countryMappedRes = fs.readFileSync(
            "/Users/admin/Code/mongodb/json/tripfizer/fully-mapped-countries-data.json",
            () => {}
        );
        const cityDatabaseRes = fs.readFileSync(
            "/Users/admin/Code/mongodb/json/cities/cities4.json",
            () => {}
        );
        const cityData = JSON.parse(cityDatabaseRes);
        const countryMappedData = JSON.parse(countryMappedRes) ?? [];
        const mappedStates = cityData.map((city, index) => {
            const {
                id,
                name,
                country_id,
                country_code,
                country_name,
                state_code,
                state_name,
                latitude,
                longitude,
                wikiDataId,
            } = city || {};

            const foundCountry = countryMappedData.find(
                (i) => country_code === i?.infoData?.iso
            );
            const foundStateData = db.states.findOne(
                {
                    "infoData.code": state_code,
                },
                undefined,
                { lean: true }
            );
            const { _id, infoData: infoDataCountry } = foundCountry || {};
            const { _id: stateId, infoData: infoDataState } =
                foundStateData || {};

            console.log("🚀 >>>>>> mappedStates >>>>>> stateId:", stateId);

            const infoData = {
                name,
                code: state_code,
                wikiDataId,
            };
            const inCountryData = {
                id: { $oid: _id?.$oid },
                name: country_name,
                code: country_code,
            };
            const inStateData = {
                id: { $oid: stateId },
                name: state_name,
                code: state_code,
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
                type: "CITY",
                infoData,
                inCountry: inCountryData,
                inState: inStateData,
                geoData: newGeoData,
            };
        });
        const listJson = JSON.stringify(mappedStates);
        await fs.writeFileSync("json/fully-mapped-city-data-4.json", listJson);
    } catch (error) {
        console.error(JSON.stringify(error));
    }
};

readDataFromLocalFileAndUpdateToDB();
