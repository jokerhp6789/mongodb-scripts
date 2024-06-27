import { DermasterServiceConfigsUtil } from "./funcs/dermasters/dermaster-service-configs.util";
import {
    exportJobCostTemplate1,
    exportJobCostTemplate2,
    exportJobCostTemplate3,
} from "./funcs/dermasters/mapJobcostTemplate";
import { updateSvJobCostData } from "./funcs/dermasters/mapSvWithJobCost";
import { addNewDataToCountries } from "./funcs/tripfizer/addNewDataToCountries";
import { addRegionToCountries } from "./funcs/tripfizer/addRegionToCountries";
import { getAllRegionAndSubRegion } from "./funcs/tripfizer/getAllRegionAndSubRegion";
import { mapCountriesLatLong } from "./funcs/tripfizer/mapCountriesLatLong";
import { filterProxies, mapProxies } from "./funcs/tripfizer/proxy/mapProxy";

const DermasterConfigUtils = new DermasterServiceConfigsUtil();

function main() {
    DermasterConfigUtils.mapAllServiceConfigsWithJobCostTemplateSets();
}

main();
