import fs from "fs";
import stateCityData from "../../../data/input/tripfizer/state-cities/tripfizer-dev.state_cities-14:07:2024.json";

export class TripfizerGeoUtils {
    async changeStateCityWorldDataToAddressData() {
        const exportData: Array<any> = (stateCityData as any).map(
            (stateCity) => {
                const { worldData, ...rest } = stateCity || {};
                return {
                    ...rest,
                    addressData: worldData,
                    updatedAt: {
                        $date: new Date().toISOString(),
                    },
                };
            }
        );
        const exportJson = JSON.stringify(exportData);
        await fs.writeFileSync(
            `updated_state_cities_${new Date().toISOString()}.json`,
            exportJson
        );
    }
}
