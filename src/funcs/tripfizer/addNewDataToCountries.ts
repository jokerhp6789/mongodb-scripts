import fs from "fs";
import path from "path";
import newData from "../../data/input/tripfizer/countries/new-data/countries-database.json";
import originalCountries from "../../data/input/tripfizer/countries/export-from-db/tripfizer-dev.countries.json";

export const addNewDataToCountries = async () => {
    const exportData: Array<any> = [];

    originalCountries.forEach(async (country) => {
        const { infoData, translations } = country;
        const foundCountry = newData.find((i) => i?.iso2 === infoData?.iso);

        const worldData: any = {};

        const svgDir =
            "/Users/trungdx/Code/mongodb-scripts/src/data/input/tripfizer/countries/flag-svg";

        if (foundCountry) {
            const {
                region,
                region_id,
                subregion,
                subregion_id,
                nationality,
                native,
                capital: newCapital,
                timezones,
                translations: newTranslations,
                emoji,
                emojiU,
            } = foundCountry;

            // get new info data
            const isoCode = infoData?.iso?.toLowerCase?.();
            try {
                const svgFilePath = path.join(svgDir, `${isoCode}.svg`);
                const svgData = fs.readFileSync(svgFilePath, "utf8");
                (infoData as any).flagSvg = svgData;
            } catch (error) {
                console.log(`No SVG file found for country: ${isoCode}`);
                console.log(
                    "🚀 >>>>>> originalCountries.forEach >>>>>> error:",
                    error
                );
            }

            Object.assign(infoData, { nationality });
            Object.assign(infoData, { native });
            Object.assign(infoData, { emoji });
            Object.assign(infoData, { emojiU });
            Object.assign(infoData, { phoneCode: [infoData?.phoneCode] });

            const capital = {
                alternativeNames: [newCapital],
            };

            Object.assign(infoData, { capital });

            // get new translation data
            if (newTranslations) {
                Object.keys(newTranslations).forEach((key) => {
                    if (!translations.find((i) => i?.language === key)) {
                        translations.push({
                            language: key,
                            name: newTranslations[key],
                        });
                    }
                });
            }

            // get new world data

            Object.assign(worldData, { region });
            Object.assign(worldData, { regionId: region_id });
            Object.assign(worldData, { subregion });
            Object.assign(worldData, { subregionId: subregion_id });
            Object.assign(worldData, { timezones });
        }
        exportData.push({ ...country, infoData, translations, worldData });
    });

    const exportJson = JSON.stringify(exportData);
    await fs.writeFileSync(
        `updated_countries_${new Date().toISOString()}.json`,
        exportJson
    );
};
