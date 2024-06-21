import fs from "fs";
import path from 'path';
import countriesWithLatLong from "../../data/input/tripfizer/countries-lat-long.json";
import originalCountries from "../../data/input/tripfizer/tripfizer-dev.countries-13:06:2024.json";

export const mapCountriesLatLong = async () => {
    const exportData: Array<any> = [];

    originalCountries.forEach(async (country) => {
        const { infoData, geoData } = country;
        const foundCountry = countriesWithLatLong.find(
            (i) => i?.code === infoData?.iso
        );

        const svgDir = '/Users/trungdx/Code/mongodb-scripts/src/data/input/tripfizer/countries/flag-svg';


        if (foundCountry) {
            const { latitude, longitude } = foundCountry;
            const point = {
                type: "Point",
                coordinates: [+longitude, +latitude],
            };
            (geoData as any).point = point;
            const isoCode = infoData?.iso?.toLowerCase?.()
            try {
                const svgFilePath = path.join(svgDir, `${isoCode}.svg`);
                const svgData = fs.readFileSync(svgFilePath, 'utf8');
                (infoData as any).flagSvg = svgData;
            } catch (error) {
                console.log(`No SVG file found for country: ${isoCode}`);
                console.log(
                    "🚀 >>>>>> originalCountries.forEach >>>>>> error:",
                    error
                );
            }
        }
        exportData.push({ ...country, geoData, infoData });
    });

    const exportJson = JSON.stringify(exportData);
    await fs.writeFileSync(
        `updated_countries_${new Date().toISOString()}.json`,
        exportJson
    );
};
