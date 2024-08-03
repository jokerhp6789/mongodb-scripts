import { DermasterServiceConfigsUtil } from "./funcs/dermasters/dermaster-service-configs.util";
import { TripfizerGeoUtils } from "./funcs/tripfizer/geo/TripfizerGeo.utils";
import { WorkInfinityXUserUtils } from "./funcs/work-infinity-x/WorkInfinityXUser.utils";

const DermasterConfigUtils = new DermasterServiceConfigsUtil();
const WorkInfinityXUser = new WorkInfinityXUserUtils();
const TripfizerGeo = new TripfizerGeoUtils();

function main() {
    TripfizerGeo.addAlternativeNamesToStates();
}

main();
