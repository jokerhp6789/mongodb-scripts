import fs from "fs";
import moment from "moment";
import { Types } from "mongoose";
import UserDb from "../../data/input/cs-infinity-x/user.json";
import UserRoleDb from "../../data/input/cs-infinity-x/user_role.json";
import ChannelDb from "../../data/input/cs-infinity-x/channel.json";
import SourceDb from "../../data/input/cs-infinity-x/created_sources.json";
import TicketDb from "../../data/input/cs-infinity-x/tickets.json";
import ReplyDb from "../../data/input/cs-infinity-x/replies.json";
import NewCustomerDb from "../../cs_infinity_x_mapped_customer_2026-03-31T01:52:23.719Z.json";
import NewTicketDb from "../../cs_infinity_x_mapped_ticket_2026-03-31T04:28:54.226Z.json";

export class CsInfinityXUtils {
    constructor() {}

    static generateCode(length: number) {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    static generateIdWithCode(
        code: string,
        lengthOfString = 5,
        index?: number
    ): string | null {
        const dateTime = moment().valueOf();
        const randomString = this.generateCode(lengthOfString);
        const newId = index
            ? `${code}${dateTime}${randomString}_${index}`
            : `${code}${dateTime}${randomString}`;
        return newId;
    }

    async mapOldCustomerToNew() {
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

    async mapOldTicketToNew() {
        const res: any[] = [];
        const data = (TicketDb as any).map((ticket) => {
            const {
                id,

                subject,
                user_id,

                domain_id,
                source_id,
                method_id,
                ticket_type_id,

                closed_at,
                closed_by,

                created_at,
                updated_at,
            } = ticket || {};

            const foundChannel = ChannelDb.find((i) => i?.id === domain_id);
            const foundSource = SourceDb.find((i) => i?.id === source_id);

            if (user_id) {
                const foundCustomer = (NewCustomerDb as any).find(
                    (i) => i?.oldData?.id === user_id
                );
                const newId = new Types.ObjectId();
                res.push({
                    _id: { $oid: newId?.toString() },
                    ticketNo: parseInt(id),
                    status: "CLOSED",
                    ticketType: "CUSTOMER_SUPPORT",
                    priority: "NORMAL",
                    method: "EMAIL",

                    subject,

                    channel: foundChannel?.newId
                        ? { $oid: foundChannel?.newId }
                        : null,
                    source: foundSource?.newId
                        ? { $oid: foundSource?.newId }
                        : null,
                    customer: foundCustomer
                        ? { $oid: foundCustomer?._id?.$oid }
                        : null,

                    oldData: { id, domain_id },

                    closedAt: closed_at ? new Date(closed_at) : null,
                    closedBy: closed_by ? { type: "SYSTEM" } : null,

                    updatedAt: new Date(updated_at),
                    createdAt: new Date(created_at),
                });
            }
        });

        const exportJson = JSON.stringify(res);
        await fs.writeFileSync(
            `cs_infinity_x_mapped_ticket_${new Date().toISOString()}.json`,
            exportJson
        );
    }

    async mapOldReplyToNew() {
        const res: any[] = [];
        const data = (ReplyDb as any).map((reply) => {
            const {
                id,

                body,
                user_id,
                ticket_id,

                type, // replies, notes
                note_type, // closed, open, spam

                created_at,
                updated_at,
            } = reply || {};


            if (ticket_id) {
                const foundTicket = (NewTicketDb as any).find(
                    (i) => i?.oldData?.id === ticket_id
                );
                const newId = new Types.ObjectId();
                if (foundTicket) {
                    const { channel, customer } = foundTicket;
                    res.push({
                        _id: { $oid: newId?.toString() },
                        ticketReplyNo:
                            CsInfinityXUtils.generateIdWithCode("CS_TRL"),

                        type:
                            type === "replies"
                                ? "REPLY"
                                : type === "notes"
                                ? "NOTE"
                                : "EVENT",
                        noteType:
                            note_type === "closed"
                                ? "CLOSED"
                                : note_type === "spam"
                                ? "SPAM"
                                : "OPEN",

                        content: body,

                        ticket: { $oid: foundTicket?._id?.$oid },
                        channel: channel ? channel : null,
                        customer: customer ? customer : null,

                        oldData: { id, ticket_id },

                        updatedAt: new Date(updated_at),
                        createdAt: new Date(created_at),
                    });
                }
            }
        });

        const exportJson = JSON.stringify(res);
        await fs.writeFileSync(
            `cs_infinity_x_mapped_reply_${new Date().toISOString()}.json`,
            exportJson
        );
    }
}
