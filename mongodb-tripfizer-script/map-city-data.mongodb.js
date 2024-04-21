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
            "/Users/trungdx/Code/mongodb-scripts/json/tripfizer/fully-mapped-countries-data.json",
            () => {}
        );
        const cityDatabaseRes = fs.readFileSync(
            "/Users/trungdx/Code/mongodb-scripts/json/cities/cities1.json",
            () => {}
        );
        const cityData = JSON.parse(cityDatabaseRes);
        const countryMappedData = JSON.parse(countryMappedRes) ?? [];
        // const mappedStates = [];
        // db.cities_1.find({}).forEach((city, index) => {
        //     const {
        //         id,
        //         name,
        //         country_id,
        //         country_code,
        //         country_name,
        //         state_code,
        //         state_name,
        //         latitude,
        //         longitude,
        //     } = city || {};

        //     const foundCountry = countryMappedData.find(
        //         (i) => country_code === i?.infoData?.iso
        //     );
        //     // const foundState = stateDatabaseRes.find(
        //     //     (i) => state_code === i?.infoData?.code
        //     // );
        //     const foundStateData = db.test.findOne({
        //         "infoData.code": state_code,
        //     });

        //     console.log(
        //         "🚀 >>>>>> mappedStates >>>>>> foundStateData:",
        //         foundStateData
        //     );

        //     const { _id, infoData: infoDataCountry } = foundCountry || {};
        //     const { _id: stateId, infoData: infoDataState } =
        //         foundStateData?.[0] || {};
        //     const infoData = {
        //         name,
        //         code: state_code,
        //     };
        //     const inCountryData = {
        //         id: _id?.$oid,
        //         name: country_name,
        //         code: country_code,
        //     };
        //     const inStateData = {
        //         id: stateId,
        //         name: state_name,
        //         code: state_code,
        //     };
        //     const newGeoData = {
        //         point:
        //             longitude && latitude
        //                 ? {
        //                       type: "Point",
        //                       coordinates: [
        //                           parseFloat(longitude),
        //                           parseFloat(latitude),
        //                       ],
        //                   }
        //                 : undefined,
        //     };

        //     const item = {
        //         type: "CITY",
        //         infoData,
        //         inCountry: inCountryData,
        //         inState: inStateData,
        //         geoData: newGeoData,
        //     };

        //     mappedStates.push(item);
        // });
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
            } = city || {};

            const foundCountry = countryMappedData.find(
                (i) => country_code === i?.infoData?.iso
            );
            // const foundState = stateDatabaseRes.find(
            //     (i) => state_code === i?.infoData?.code
            // );
            const foundStateData = db.test.findOne({
                "infoData.code": state_code,
            });

            console.log(
                "🚀 >>>>>> mappedStates >>>>>> foundStateData:",
                foundStateData
            );

            const { _id, infoData: infoDataCountry } = foundCountry || {};
            const { _id: stateId, infoData: infoDataState } =
                foundStateData?.[0] || {};
            const infoData = {
                name,
                code: state_code,
            };
            const inCountryData = {
                id: _id?.$oid,
                name: country_name,
                code: country_code,
            };
            const inStateData = {
                id: stateId,
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
        await fs.writeFileSync("json/fully-mapped-city-data-1.json", listJson);
    } catch (error) {
        console.error(JSON.stringify(error));
    }
};

readDataFromLocalFileAndUpdateToDB();
