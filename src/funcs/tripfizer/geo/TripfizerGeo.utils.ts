import fs from "fs";

// states
import stateOriginalData from "../../../../json/tripfizer/states/states.json";
import stateDbData from "../../../data/input/tripfizer/state-cities/tripfizer-dev.state-17:07:2024.json";

// states
import cityOriginalData from "../../../../json/tripfizer/cities/cities.json";
import cityOriginalData_1 from "../../../../json/tripfizer/cities/cities1.json";

// countries
import countryDbData from "../../../data/output/tripfizer/updated_countries_2024-06-20T11:47:45.826Z.json";
import { StringUtils } from "../../../utils/String.utils";

export class TripfizerGeoUtils {
    async changeStateCityWorldDataToAddressData() {
        const stateCityData = [];
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

    async addStateIdToStates() {
        const exportData: Array<any> = (stateDbData as any).map(
            (stateCity, index) => {
                const { infoData, addressData, ...rest } = stateCity || {};
                const stateCode = `${addressData?.inCountry?.code}_${infoData?.code}`;
                const foundState = stateOriginalData.find(
                    (item) =>
                        `${item.country_code}_${item?.state_code}` === stateCode
                );
                if (!foundState) {
                    console.error("Not found", stateCode);
                }
                return {
                    ...rest,
                    infoData: {
                        ...infoData,
                        code: stateCode,
                        stateCityId: `${foundState?.country_id}_${foundState?.id}`,
                    },
                    updatedAt: {
                        $date: new Date().toISOString(),
                    },
                };
            }
        );
        const exportJson = JSON.stringify(exportData);
        await fs.writeFileSync(
            `updated_state_${new Date().toISOString()}.json`,
            exportJson
        );
    }

    async addAlternativeNamesToStates() {
        const exportData: Array<any> = (stateDbData as any).map(
            (stateCity, index) => {
                const { infoData, ...rest } = stateCity || {};
                const stateDbDataWithAddress = [];
                const foundState = stateDbDataWithAddress.find(
                    (item) => item._id.$oid === stateCity?._id.$oid
                );
                if (!foundState) {
                    console.error("Not found", stateCity?._id.$oid);
                }
                const infoDataMapped = { ...infoData };
                if (
                    StringUtils.checkContainNoneEnglishCharacter(infoData?.name)
                ) {
                    const mappedName = StringUtils.mapNoneEnglishToEnglish(
                        infoData?.name
                    );
                    infoDataMapped.alternativeNames = [mappedName];
                }
                return {
                    ...rest,
                    infoData: infoDataMapped,
                    addressData: foundState?.addressData,
                    updatedAt: {
                        $date: new Date().toISOString(),
                    },
                };
            }
        );
        const exportJson = JSON.stringify(exportData);
        await fs.writeFileSync(
            `updated_state_${new Date().toISOString()}.json`,
            exportJson
        );
    }

    async removeStateId() {
        const exportData: Array<any> = (stateDbData as any).map(
            (stateCity, index) => {
                const { infoData, ...rest } = stateCity || {};
                return {
                    ...rest,
                    infoData: {
                        name: infoData?.name,
                        code: infoData?.code,
                    },
                    updatedAt: {
                        $date: new Date().toISOString(),
                    },
                };
            }
        );
        const exportJson = JSON.stringify(exportData);
        await fs.writeFileSync(
            `updated_state_${new Date().toISOString()}.json`,
            exportJson
        );
    }

    async mapOriginalCitiesToDbCities() {
        let numberOfNotFoundCountry = 0;
        let numberOfNotFoundState = 0;
        const notFoundCountryCode = {};
        const notFoundStateCode = {};
        const exportData: Array<any> = (cityOriginalData as any[]).map(
            (city, index) => {
                const {
                    id,
                    name,
                    state_code,
                    state_name,
                    country_code,
                    latitude,
                    longitude,
                    wikiDataId,
                    ...rest
                } = city || {};
                const foundCountry = (countryDbData as any[]).find(
                    (country) => country?.infoData?.iso === country_code
                );
                if (!foundCountry) {
                    console.error("Not found country for:", { city });
                    numberOfNotFoundCountry++;
                    notFoundCountryCode[country_code] = true;
                    return null;
                }

                const stateCode = `${country_code}_${state_code}`;
                const foundState = stateDbData.find(
                    (item) => item?.infoData?.code === stateCode
                );
                if (!foundState) {
                    console.error("Not found state for: ", { city });
                    numberOfNotFoundState++;
                    notFoundStateCode[stateCode] = true;
                    return null;
                }

                const infoData: any = {
                    name,
                    code: `${stateCode}_${id}`,
                    wikiDataId,
                };
                if (StringUtils.checkContainNoneEnglishCharacter(name)) {
                    const mappedName =
                        StringUtils.mapNoneEnglishToEnglish(name);
                    infoData.alternativeNames = [mappedName];
                }
                const geoData = {
                    point: {
                        type: "Point",
                        coordinates: [
                            parseFloat(longitude),
                            parseFloat(latitude),
                        ],
                    },
                };
                const addressData = {
                    inCountry: {
                        _id: foundCountry?._id,
                        name: foundCountry?.infoData?.name,
                        code: foundCountry?.infoData?.iso,
                    },
                    inState: {
                        _id: foundState?._id,
                        name: foundState?.infoData?.name,
                        code: foundState?.infoData?.code,
                    },
                };

                return {
                    type: "CITY",
                    status: "ACTIVE",
                    infoData,
                    geoData,
                    addressData,
                    createdAt: {
                        $date: new Date().toISOString(),
                    },
                    updatedAt: {
                        $date: new Date().toISOString(),
                    },
                };
            }
        );

        console.log(
            "Number of cities can not found country: ",
            numberOfNotFoundCountry
        );
        console.log("Not found country code: ", notFoundCountryCode);
        console.log(
            "Number of cities can not found state: ",
            numberOfNotFoundState
        );
        console.log("Not found state code: ", notFoundStateCode);

        const exportJson = JSON.stringify(exportData);

        await fs.writeFileSync(
            `updated_city_${new Date().toISOString()}.json`,
            exportJson
        );
    }
}
