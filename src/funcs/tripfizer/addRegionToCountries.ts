import fs from "fs";
import path from "path";
import newData from "../../data/input/tripfizer/countries/new-data/updated_countries.json";
import { WORLD_REGIONS, WORLD_SUB_REGIONS } from "./getAllRegionAndSubRegion";

export const addRegionToCountries = async () => {
    const exportData: Array<any> = (newData as any).map((country) => {
        const { worldData } = country || {};
        const { region, subregion } = worldData || {};
        const foundRegion = WORLD_REGIONS.find(
            (item) => item?.label === region
        );
        const foundSubRegion = WORLD_SUB_REGIONS.find(
            (item) => item?.label === subregion
        );
        if (foundRegion) {
            Object.assign(worldData, {
                region: foundRegion?.label,
                regionId: foundRegion?.id,
            });
        }
        if (foundSubRegion) {
            Object.assign(worldData, {
                subregion: foundSubRegion?.label,
                subregionId: foundSubRegion?.id,
            });
        }

        return {
            ...country,
            worldData,
        };
    });

    const exportJson = JSON.stringify(exportData);
    await fs.writeFileSync(
        `updated_countries_${new Date().toISOString()}.json`,
        exportJson
    );
};
