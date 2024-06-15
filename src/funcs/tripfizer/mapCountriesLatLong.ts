import fs from "fs";
import countriesWithLatLong from "../../data/input/tripfizer/countries-lat-long.json";
import originalCountries from "../../data/input/tripfizer/tripfizer-dev.countries-13:06:2024.json";

export const mapCountriesLatLong = async () => {
    const exportData: Array<any> = [];

    originalCountries.forEach((country) => {
        const { infoData, geoData } = country;
        const foundCountry = countriesWithLatLong.find(
            (i) => i?.code === infoData?.iso
        );

        if (foundCountry) {
            const { latitude, longitude } = foundCountry;
            const point = {
                type: "Point",
                coordinates: [+longitude, +latitude],
            };
            (geoData as any).point = point;
        }
        exportData.push({ ...country, geoData });
    });

    const exportJson = JSON.stringify(exportData);
    await fs.writeFileSync(
        `updated_countries_${new Date().toISOString()}.json`,
        exportJson
    );
};
