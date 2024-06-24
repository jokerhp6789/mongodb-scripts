import { every } from "lodash";
import fs from "fs";
import svWithJobCost from "../../data/input/dermaster/service-config-jobcost_new_updated.json";
import svData from "../../data/input/dermaster/service-configs/dermaster_erp_staging.service_configuration.json";

export enum PurchaseType {
    NORMAL = "NORMAL",
    AGENCY = "AGENCY",
    MARKETING = "MARKETING",
    COMPLICATION = "COMPLICATION",
    VIP = "VIP",
    STAFF = "STAFF",
}

export enum JobTypeAdmin {
    NORMAL_EMPLOYEE = "NORMAL_EMPLOYEE",
    DOCTOR = "DOCTOR",
    THERAPIST = "THERAPIST",
    NURSE = "NURSE",
    DRIVER = "DRIVER",
}

export enum JobCostType {
    DOCTOR_FEE = "DOCTOR_FEE",
    THERAPIST_FEE = "THERAPIST_FEE",
    NURSE_FEE = "NURSE_FEE",
    THERAPIST_FEE_SUB = "THERAPIST_FEE_SUB",
    NURSE_FEE_SUB = "NURSE_FEE_SUB",
    ANESTHESIOLOGIST_FEE = "ANESTHESIOLOGIST_FEE",
    ASSISTANT_ANESTHESIOLOGIST_FEE = "ASSISTANT_ANESTHESIOLOGIST_FEE",
    ASSISTANT_SCRUB_FEE = "ASSISTANT_SCRUB_FEE",
    ASSISTANT_FEE = "ASSISTANT_FEE",
    SCRUB_NURSE_FEE = "SCRUB_NURSE_FEE",
    CIRCULATE_NURSE_FEE = "CIRCULATE_NURSE_FEE",
    RECOVERY_ROOM_NURSE_FEE = "RECOVERY_ROOM_NURSE_FEE",
    REGISTER_NURSE_FEE = "REGISTER_NURSE_FEE",
    PRACTITIONER_NURSE_FEE = "PRACTITIONER_NURSE_FEE",
    AID_NURSE_FEE = "AID_NURSE_FEE",
    STAFF_FEE = "STAFF_FEE",
}

export enum FeeType {
    PERCENTAGE = "PERCENTAGE",
    AMOUNT = "AMOUNT",
}

export enum FeeUnit {
    TIME = "TIME",
    MINUTES = "MINUTES",
    NIGHT = "NIGHT",
    PIECE = "PIECE",
}

const mapJobCostType = (jobCostType: string) => {
    switch (jobCostType) {
        case "Doctor Fee":
            return JobCostType.DOCTOR_FEE;
        case "Therapist Fee (Primary)":
            return JobCostType.THERAPIST_FEE;
        case "Therapist Fee (Supplementary)":
            return JobCostType.THERAPIST_FEE_SUB;
        case "Nurse Fee (Primary)":
            return JobCostType.NURSE_FEE;
        case "Nurse Fee (Supplementary)":
            return JobCostType.NURSE_FEE_SUB;
        default:
            console.error("Unknown Job Cost Type: ", jobCostType);
            break;
    }
};

const mapRole = (role: string) => {
    switch (role) {
        case "Nurse":
            return JobTypeAdmin.NURSE;
        case "Doctor":
            return JobTypeAdmin.DOCTOR;
        case "Therapist":
            return JobTypeAdmin.THERAPIST;
        default:
            console.error("Unknown Role: ", role);
            break;
    }
};

const mapPurchaseType = (type: string) => {
    switch (type) {
        case "Normal":
            return PurchaseType.NORMAL;
        case "Marketing":
            return PurchaseType.MARKETING;
        case "Complication":
            return PurchaseType.COMPLICATION;
        case "VIP":
            return PurchaseType.VIP;
        case "Staff":
            return PurchaseType.STAFF;
        case "Agency":
            return PurchaseType.AGENCY;
        default:
            console.error("Unknown Purchase Type: ", type);
            break;
    }
};

const mapPrimaryFeeType = (feeType: string) => {
    switch (feeType) {
        case "Fixed rate (%)":
            return FeeType.PERCENTAGE;
        case "Fixed rate (THB)":
            return FeeType.AMOUNT;
        default:
            console.error("Unknown Primary Fee Type: ", feeType);
            break;
    }
};

const mapFeeUnit = (unit: string) => {
    switch (unit) {
        case "Time":
            return FeeUnit.TIME;
        default:
            console.error("Unknown Purchase Fee Unit: ", unit);
            break;
    }
};

export const updateSvJobCostData = async () => {
    const exportData: Array<any> = [];
    (svData as any).forEach((sv: any) => {
        const { serviceNo, ...rest } = sv || {};
        const svWithJobCostItems = (svWithJobCost as any).filter((i) => {
            return i?.System_ID === sv?.serviceNo;
        });
        if (svWithJobCostItems.length > 0) {
            let defaultSaleCommission: any =
                svWithJobCostItems[0]?.Default_sale_commission;
            if (
                every(
                    svWithJobCostItems,
                    (i) => i?.Default_sale_commission === defaultSaleCommission
                )
            ) {
                const percentageString =
                    svWithJobCostItems[0]?.Default_sale_commission;
                defaultSaleCommission = parseFloat(
                    percentageString.replace("%", "")
                );
            } else {
                console.error("Default Sale Commission is not the same.", {
                    serviceNo,
                });
            }
            const jobCost = svWithJobCostItems.map((item) => {
                const { Type_, Role, Unit, Amount, Default_sale_commission } =
                    item;
                const PurchaseType = item["Purchase Type"];
                const PrimaryFeeUnit = item["Primary Fee Unit"];
                const UnitQty = item["Unit Qty."];

                const type = mapJobCostType(Type_);
                const role = mapRole(Role);
                const unit = mapFeeUnit(Unit);

                const amount = Amount;

                const purchaseType = mapPurchaseType(PurchaseType);
                const feeType = mapPrimaryFeeType(PrimaryFeeUnit);
                const unitQty = UnitQty;

                return {
                    type,
                    role,
                    purchaseType,
                    primaryFee: { unit, amount, feeType, unitQty },
                };
            });

            exportData.push({ ...sv, jobCost, defaultSaleCommission });
        } else {
            console.error("Can not find Job Cost for Service No: ", serviceNo);
        }
    });

    const exportJson = JSON.stringify(exportData);
    await fs.writeFileSync(
        `mapped_sv_with_job_cost_${new Date().toISOString()}.json`,
        exportJson
    );
};
