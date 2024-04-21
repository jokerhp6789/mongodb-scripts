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
            "/Users/trungdx/Code/mongodb-scripts/json/tripfizer/mapped-countries-data.json",
            () => {}
        );
        const countryDatabaseRes = fs.readFileSync(
            "/Users/trungdx/Code/mongodb-scripts/json/countries/original/countries-database.json",
            () => {}
        );
        const countryFull = JSON.parse(countryMappedRes);
        // const countryFullShorted = countryFull.sort(function (a, b) {
        //     let x = a.name.toLowerCase();
        //     let y = b.name.toLowerCase();
        //     if (x < y) {
        //         return -1;
        //     }
        //     if (x > y) {
        //         return 1;
        //     }
        //     return 0;
        // });
        const countryDatabase = JSON.parse(countryDatabaseRes) ?? [];
        const mappedCountry = countryFull.map((country, index) => {
            const { infoData, geoData, translations, ...rest } = country || {};
            const foundDb = countryDatabase.find(
                (i) => i?.iso3 === infoData?.isoAlpha3
            );

            const {
                id,
                capital,
                native,
                region,
                region_id,
                subregion,
                subregion_id,
                nationality,
                timezones,
                translations: translationsDb,
                latitude,
                longitude,
                emoji,
                emojiU,
            } = foundDb || {};
            const newInfoData = {
                ...infoData,
                capital,
                native,
                nationality,
                emoji,
                emojiU,
            };
            const newRegionData = {
                region,
                regionId: region_id,
                subregion,
                subregionId: subregion_id,
                timezones,
            };
            const newGeoData = {
                ...(geoData || {}),
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
            // const newTranslationArr = [...(translations || [])];
            // const langs = (translations || []).map((i) => i.language);
            // if (translationsDb) {
            //     Object.keys(JSON.parse(translationsDb)).forEach((key) => {
            //         if (!langs?.includes(key)) {
            //             newTranslationArr.push({
            //                 language: key,
            //                 name: translationsDb[key],
            //             });
            //         }
            //     });
            // }

            return {
                ...rest,
                countryId: id,
                infoData: newInfoData,
                regionData: newRegionData,
                geoData: newGeoData,
                translations,
                // translations: newTranslationArr,
            };
        });
        const listJson = JSON.stringify(mappedCountry);
        await fs.writeFileSync("json/fully-mapped-data.json", listJson);
    } catch (error) {
        console.error(JSON.stringify(error));
    }
};

readDataFromLocalFileAndUpdateToDB();
