import fs from "fs";
// import USERS_FROM_DB from "../../data/input/work-infinity-x/users/work_infinity_x_prod.users-07:06:2024-14:30.json";

export class WorkInfinityXUserUtils {
    constructor() {}

    async removeGpsDataFromUsers() {
        // const data = (USERS_FROM_DB as any).map((user) => {
        //     return {
        //         ...user,
        //         otherInformation: {
        //             ...(user.otherInformation || {}),
        //             gpsData: undefined,
        //         },
        //     };
        // });
        // const exportJson = JSON.stringify(data);
        // await fs.writeFileSync(
        //     `user_removed_gps_${new Date().toISOString()}.json`,
        //     exportJson
        // );
    }
}
