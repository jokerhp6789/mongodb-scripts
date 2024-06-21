import fs from "fs";
import path from "path";
import { groupBy } from "lodash";
import newData from "../../data/input/tripfizer/countries/new-data/countries-database.json";

export enum WorldRegion {
    ASIA = "ASIA",
    EUROPE = "EUROPE",
    AFRICA = "AFRICA",
    OCEANIA = "OCEANIA",
    AMERICAS = "AMERICAS",
    POLAR = "POLAR",
}

export enum WorldSubRegion {
    SOUTHERN_ASIA = "SOUTHERN_ASIA",
    WESTERN_ASIA = "WESTERN_ASIA",
    CENTRAL_ASIA = "CENTRAL_ASIA",
    SOUTH_EASTERN_ASIA = "SOUTH_EASTERN_ASIA",
    EASTERN_ASIA = "EASTERN_ASIA",

    NORTHERN_EUROPE = "NORTHERN_EUROPE",
    SOUTHERN_EUROPE = "SOUTHERN_EUROPE",
    WESTERN_EUROPE = "WESTERN_EUROPE",
    EASTERN_EUROPE = "EASTERN_EUROPE",

    NORTHERN_AFRICA = "NORTHERN_AFRICA",
    MIDDLE_AFRICA = "MIDDLE_AFRICA",
    WESTERN_AFRICA = "WESTERN_AFRICA",
    SOUTHERN_AFRICA = "SOUTHERN_AFRICA",
    EASTERN_AFRICA = "EASTERN_AFRICA",

    NORTHERN_AMERICA = "NORTHERN_AMERICA",
    SOUTHERN_AMERICA = "SOUTHERN_AMERICA",
    CENTRAL_AMERICA = "CENTRAL_AMERICA",

    MELANESIA = "MELANESIA",
    MICRONESIA = "MICRONESIA",
    POLYNESIA = "POLYNESIA",
    CARIBBEAN = "CARIBBEAN",
    AUSTRALIA_AND_NEW_ZEALAND = "AUSTRALIA_AND_NEW_ZEALAND",
}

export const WORLD_REGIONS = [
    {
        id: WorldRegion.ASIA,
        label: "Asia",
    },
    {
        id: WorldRegion.EUROPE,
        label: "Europe",
    },
    {
        id: WorldRegion.AFRICA,
        label: "Africa",
    },
    {
        id: WorldRegion.OCEANIA,
        label: "Oceania",
    },
    {
        id: WorldRegion.AMERICAS,
        label: "Americas",
    },
    {
        id: WorldRegion.POLAR,
        label: "Polar",
    },
];

export const WORLD_SUB_REGIONS = [
    {
        id: WorldSubRegion.SOUTHERN_ASIA,
        label: "Southern Asia",
    },
    {
        id: WorldSubRegion.WESTERN_ASIA,
        label: "Western Asia",
    },
    {
        id: WorldSubRegion.CENTRAL_ASIA,
        label: "Central Asia",
    },
    {
        id: WorldSubRegion.SOUTH_EASTERN_ASIA,
        label: "South-Eastern Asia",
    },
    {
        id: WorldSubRegion.EASTERN_ASIA,
        label: "Eastern Asia",
    },

    {
        id: WorldSubRegion.NORTHERN_EUROPE,
        label: "Northern Europe",
    },
    {
        id: WorldSubRegion.SOUTHERN_EUROPE,
        label: "Southern Europe",
    },
    {
        id: WorldSubRegion.WESTERN_EUROPE,
        label: "Western Europe",
    },
    {
        id: WorldSubRegion.EASTERN_EUROPE,
        label: "Eastern Europe",
    },

    {
        id: WorldSubRegion.NORTHERN_AFRICA,
        label: "Northern Africa",
    },
    {
        id: WorldSubRegion.MIDDLE_AFRICA,
        label: "Middle Africa",
    },
    {
        id: WorldSubRegion.WESTERN_AFRICA,
        label: "Western Africa",
    },
    {
        id: WorldSubRegion.SOUTHERN_AFRICA,
        label: "Southern Africa",
    },
    {
        id: WorldSubRegion.EASTERN_AFRICA,
        label: "Eastern Africa",
    },

    {
        id: WorldSubRegion.SOUTHERN_AMERICA,
        label: "South America",
    },
    {
        id: WorldSubRegion.CENTRAL_AMERICA,
        label: "Central America",
    },
    {
        id: WorldSubRegion.NORTHERN_AMERICA,
        label: "Northern America",
    },

    {
        id: WorldSubRegion.MELANESIA,
        label: "Melanesia",
    },
    {
        id: WorldSubRegion.MICRONESIA,
        label: "Micronesia",
    },
    {
        id: WorldSubRegion.POLYNESIA,
        label: "Polynesia",
    },
    {
        id: WorldSubRegion.CARIBBEAN,
        label: "Caribbean",
    },
    {
        id: WorldSubRegion.AUSTRALIA_AND_NEW_ZEALAND,
        label: "Australia and New Zealand",
    },
];

export const getAllRegionAndSubRegion = async () => {
    const allRegions: Array<any> = [];
    const allSubRegions: Array<any> = [];

    // const groupByRegion = groupBy(newData, "region");
    // const groupBySubRegion = groupBy(newData, "subregion");

    // if (groupByRegion) {
    //     Object.keys(groupByRegion).forEach((key) => {
    //         allRegions.push(key);
    //     });
    // }

    // if (groupBySubRegion) {
    //     Object.keys(groupBySubRegion).forEach((key) => {
    //         allSubRegions.push(key);
    //     });
    // }

    // const exportRegionJson = JSON.stringify(allRegions);
    // const exportSubRegionJson = JSON.stringify(allSubRegions);
    // await fs.writeFileSync(
    //     `all_regions_${new Date().toISOString()}.json`,
    //     exportRegionJson
    // );
    // await fs.writeFileSync(
    //     `all_sub_regions_${new Date().toISOString()}.json`,
    //     exportSubRegionJson
    // );

    newData.forEach((data) => {
        if (!data?.region) {
            console.log("Can not find region", data?.iso2);
        }
    });
};
