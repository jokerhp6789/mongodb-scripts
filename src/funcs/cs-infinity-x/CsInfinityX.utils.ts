import fs from "fs";
import { Types } from "mongoose";
import UserDb from "../../data/input/cs-infinity-x/user.json";
import UserRoleDb from "../../data/input/cs-infinity-x/user_role.json";
import ChannelDb from "../../data/input/cs-infinity-x/channel.json";
import SourceDb from "../../data/input/cs-infinity-x/created_sources.json";

export class CsInfinityXUtils {
    constructor() {}

    async mapOldCustomerToNew() {
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

        const res: any[] = [];

        const data = (UserDb as any).map((user) => {
            const {
                id,
                avatar,
                first_name,
                last_name,
                nickname,
                gender,
                email,
                phone,

                domain_id,
                source_id,

                created_at,
                updated_at,
            } = user || {};

            const foundUserRole = (UserRoleDb as any).find(
                (i) => i?.user_id === id
            );
            const foundChannel = ChannelDb.find((i) => i?.id === domain_id);
            const foundSource = SourceDb.find((i) => i?.id === source_id);
            if (
                foundUserRole?.role_id === "1" &&
                !!foundChannel?.newId &&
                foundChannel?.newId?.length === 24
            ) {
                const newId = new Types.ObjectId();
                res.push({
                    _id: { $oid: newId?.toString() },
                    customerNo: parseInt(id),
                    status: "ACTIVE",
                    avatar,
                    channel: { $oid: foundChannel?.newId },
                    firstName: first_name,
                    lastName: last_name,
                    nickName: nickname,
                    email,
                    phone,

                    source: foundSource?.newId
                        ? { $oid: foundSource?.newId }
                        : undefined,

                    oldData: { id, domain_id },

                    updatedAt: new Date(updated_at),
                    createdAt: new Date(created_at),
                });
            }
        });

        const exportJson = JSON.stringify(res);
        await fs.writeFileSync(
            `cs_infinity_x_mapped_customer_${new Date().toISOString()}.json`,
            exportJson
        );
    }
}
