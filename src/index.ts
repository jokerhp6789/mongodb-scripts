import { DermasterServiceConfigsUtil } from "./funcs/dermasters/dermaster-service-configs.util";
import { TripfizerGeoUtils } from "./funcs/tripfizer/geo/TripfizerGeo.utils";
import { WorkInfinityXUserUtils } from "./funcs/work-infinity-x/WorkInfinityXUser.utils";
import { WorkInfinityXBranchUtils } from "./funcs/work-infinity-x/WorkInfinityXBranch.utils";

const DermasterConfigUtils = new DermasterServiceConfigsUtil();
const WorkInfinityXUser = new WorkInfinityXUserUtils();
const WorkInfinityXBranch = new WorkInfinityXBranchUtils();
const TripfizerGeo = new TripfizerGeoUtils();

function main() {
    WorkInfinityXBranch.addBranchNo();
}

main();
