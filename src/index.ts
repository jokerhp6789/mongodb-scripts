import { DermasterServiceConfigsUtil } from "./funcs/dermasters/dermaster-service-configs.util";
import { TripfizerGeoUtils } from "./funcs/tripfizer/geo/TripfizerGeo.utils";
import { WorkInfinityXUserUtils } from "./funcs/work-infinity-x/WorkInfinityXUser.utils";
import { WorkInfinityXBranchUtils } from "./funcs/work-infinity-x/WorkInfinityXBranch.utils";
import { CsInfinityXUtils as ClassCsInfinityXUtils } from "./funcs/cs-infinity-x/CsInfinityX.utils";

const DermasterConfigUtils = new DermasterServiceConfigsUtil();
const WorkInfinityXUser = new WorkInfinityXUserUtils();
const WorkInfinityXBranch = new WorkInfinityXBranchUtils();
const TripfizerGeo = new TripfizerGeoUtils();
const CsInfinityXUtils = new ClassCsInfinityXUtils();

function main() {
    CsInfinityXUtils.mapOldCustomerToNew();
}

main();
