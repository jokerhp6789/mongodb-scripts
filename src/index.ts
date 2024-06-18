import { exportJobCostTemplate1, exportJobCostTemplate2, exportJobCostTemplate3 } from "./funcs/dermasters/mapJobcostTemplate";
import { updateSvJobCostData } from "./funcs/dermasters/mapSvWithJobCost";
import { mapCountriesLatLong } from "./funcs/tripfizer/mapCountriesLatLong";
import { filterProxies, mapProxies } from "./funcs/tripfizer/proxy/mapProxy";

function main() {
    exportJobCostTemplate3();
}

main();
