import { updateSvJobCostData } from "./funcs/dermasters/mapJobCost";
import { mapCountriesLatLong } from "./funcs/tripfizer/mapCountriesLatLong";
import { filterProxies, mapProxies } from "./funcs/tripfizer/proxy/mapProxy";

function main() {
    updateSvJobCostData();
}

main();
