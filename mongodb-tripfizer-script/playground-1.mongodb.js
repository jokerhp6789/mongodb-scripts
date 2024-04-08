/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const fs = require("fs");

const database = "tripfizer-dev";

// The current database to use.
use(database);

const readDataFromLocalFileAndUpdateToDB = async () => {
    try {
        const countryFullRes = fs.readFileSync(
            "/Users/trungdx/Code/mongodb-scripts/json/countries/original/country-full.json",
            () => {}
        );
        const countryGeoRes = fs.readFileSync(
            "/Users/trungdx/Code/mongodb-scripts/json/countries/original/country-geo.json",
            () => {}
        );
        const countryFull = JSON.parse(countryFullRes);
        const countryFullShorted = countryFull.sort(function (a, b) {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        const countryGeo = JSON.parse(countryGeoRes)?.features ?? [];
        const mappedCountry = countryFullShorted.map((country, index) => {
            const {
                _id,
                name,
                isoAlpha3,
                isoNumeric,
                translations,
                currency,
                code,
                flag,
                phoneCode,
            } = country || {};
            const foundGeo = countryGeo.find(
                (i) => i?.id === country?.isoAlpha3
            )?.geometry;
            return {
                _id,
                order: index + 1,
                primary: false,
                infoData: {
                    name,
                    iso: code,
                    isoAlpha3,
                    isoNumeric,
                    flag,
                    phoneCode,
                },
                currency,
                geoData: {
                    polygon: foundGeo ? foundGeo : null,
                },
                translations,
            };
        });
        const listJson = JSON.stringify(mappedCountry);
        await fs.writeFileSync("json/mapped-data.json", listJson);
    } catch (error) {
        console.error(JSON.stringify(error));
    }
};

readDataFromLocalFileAndUpdateToDB();
