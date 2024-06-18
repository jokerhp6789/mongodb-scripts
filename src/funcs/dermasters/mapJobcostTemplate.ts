import fs from "fs";

export enum JobCostTemplate {
    JC1_TEMPLATE = "JC1_TEMPLATE",
    JC2_TEMPLATE = "JC2_TEMPLATE",
    JC3_TEMPLATE = "JC3_TEMPLATE",
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

export const JOB_COST_PRESET = [
    {
        id: JobCostTemplate.JC1_TEMPLATE,
        presets: [
            //Case 1 Purchase Type = Normal
            {
                purchaseType: PurchaseType.NORMAL,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 10,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.NORMAL,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.NORMAL,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.NORMAL,
                type: JobCostType.NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.NORMAL,
                type: JobCostType.NURSE_FEE_SUB,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            //Case 2 Purchase Type = Agency
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 10,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.NURSE_FEE_SUB,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            //Case 3 Purchase Type = Marketing
            {
                purchaseType: PurchaseType.MARKETING,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 10,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.MARKETING,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.MARKETING,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.MARKETING,
                type: JobCostType.NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.MARKETING,
                type: JobCostType.NURSE_FEE_SUB,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            //Case 4 Purchase Type = Complication
            {
                purchaseType: PurchaseType.COMPLICATION,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 10, // if not doctor own case otherwise amount = 0
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.COMPLICATION,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.COMPLICATION,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.COMPLICATION,
                type: JobCostType.NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.COMPLICATION,
                type: JobCostType.NURSE_FEE_SUB,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            //Case 5 Purchase Type = VIP
            {
                purchaseType: PurchaseType.VIP,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 10,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.VIP,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.VIP,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.VIP,
                type: JobCostType.NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.VIP,
                type: JobCostType.NURSE_FEE_SUB,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            //Case 5 Purchase Type = STAFF
            {
                purchaseType: PurchaseType.STAFF,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 0,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.STAFF,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.STAFF,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.STAFF,
                type: JobCostType.NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.STAFF,
                type: JobCostType.NURSE_FEE_SUB,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 25,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
        ],
    },

    {
        id: JobCostTemplate.JC2_TEMPLATE,
        presets: [
            //Case 1 Purchase Type = No Agency
            {
                purchaseType: null,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 35,
                    amountSecondary: 40, //  amount apply for LA surgery
                    applySecondary: true,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.ANESTHESIOLOGIST_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 3600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 30,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 15,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.ANESTHESIOLOGIST_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 3600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 30,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 15,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.ASSISTANT_ANESTHESIOLOGIST_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 0,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 30,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.ASSISTANT_SCRUB_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 300,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 60,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.ASSISTANT_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 200,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.SCRUB_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 200,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.CIRCULATE_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 100,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 20,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.RECOVERY_ROOM_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 0,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.REGISTER_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1920,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.PRACTITIONER_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1000,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.AID_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 840,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.STAFF_FEE,
                role: JobTypeAdmin.NORMAL_EMPLOYEE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 840,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            //Case 2 Purchase Type = Agency
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 35,
                    amountSecondary: 40,
                    applySecondary: true,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.ANESTHESIOLOGIST_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 3600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 30,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 15,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.ANESTHESIOLOGIST_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 3600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 30,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 600,
                    amountSecondary: 0,
                    applySecondary: true,
                    unit: FeeUnit.MINUTES,
                    unitQty: 15,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.ASSISTANT_ANESTHESIOLOGIST_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 0,
                    unit: FeeUnit.MINUTES,
                    unitQty: 30,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.ASSISTANT_SCRUB_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 300,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 60,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.ASSISTANT_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 200,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.SCRUB_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 200,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 50,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.CIRCULATE_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 100,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
                secondaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 20,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                    triggerThresholdQty: 30,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.RECOVERY_ROOM_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 0,
                    unit: FeeUnit.MINUTES,
                    unitQty: 60,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.REGISTER_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1920,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.PRACTITIONER_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1000,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.AID_NURSE_FEE,
                role: JobTypeAdmin.NURSE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 840,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.STAFF_FEE,
                role: JobTypeAdmin.NORMAL_EMPLOYEE,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 840,
                    unit: FeeUnit.NIGHT,
                    unitQty: 1,
                },
            },
        ],
    },

    {
        id: JobCostTemplate.JC3_TEMPLATE,
        presets: [
            //Case 1 Purchase Type = No Agency
            {
                purchaseType: null,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 40,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1,
                    unit: FeeUnit.PIECE,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: null,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1,
                    unit: FeeUnit.PIECE,
                    unitQty: 1,
                },
            },
            //Case 1 Purchase Type =  Agency
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.DOCTOR_FEE,
                role: JobTypeAdmin.DOCTOR,
                primaryFee: {
                    feeType: FeeType.PERCENTAGE,
                    amount: 40,
                    unit: FeeUnit.TIME,
                    unitQty: 1,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.THERAPIST_FEE,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1,
                    unit: FeeUnit.PIECE,
                    unitQty: 1,
                    isFlexible: false,
                },
            },
            {
                purchaseType: PurchaseType.AGENCY,
                type: JobCostType.THERAPIST_FEE_SUB,
                role: JobTypeAdmin.THERAPIST,
                primaryFee: {
                    feeType: FeeType.AMOUNT,
                    amount: 1,
                    unit: FeeUnit.PIECE,
                    unitQty: 1,
                },
            },
        ],
    },
];

export const exportJobCostTemplate1 = async () => {
    const presets = JOB_COST_PRESET.find(
        (template) => template.id === JobCostTemplate.JC1_TEMPLATE
    )?.presets;

    const jsonArr: any[] = [];
    presets.forEach((item) => {
        const row: any = {};
        const { purchaseType, type, role, primaryFee, secondaryFee } = item;
        row["Type"] = type;
        row["Role"] = role;
        row["Purchase Type"] = purchaseType;
        if (primaryFee) {
            const {
                feeType,
                amount,
                unit,
                unitQty,
                isFlexible,
                amountSecondary,
                applySecondary,
            } = primaryFee;
            row["Primary Fee Type"] = feeType;
            row["Primary Fee Amount"] = amount;
            row["Primary Fee Unit"] = unit;
            row["Primary Fee Unit Qty."] = unitQty;
            row[
                "Primary Fee Flexible (Use for therapist fee in template 1 & 3 )"
            ] = !!isFlexible;
            row["Primary Fee Apply Secondary"] = !!applySecondary;
            row["Primary Fee Amount Secondary"] = amountSecondary;
        }

        jsonArr.push(row);
    });

    const exportJson = JSON.stringify(jsonArr);
    await fs.writeFileSync(
        `mapped_job_cost_template_1.json`,
        exportJson
    );
};

export const exportJobCostTemplate2 = async () => {
    const presets = JOB_COST_PRESET.find(
        (template) => template.id === JobCostTemplate.JC2_TEMPLATE
    )?.presets;

    const jsonArr: any[] = [];
    presets.forEach((item) => {
        const row: any = {};
        const { purchaseType, type, role, primaryFee, secondaryFee } = item;
        row["Type"] = type;
        row["Role"] = role;
        row["Purchase Type"] = purchaseType ? purchaseType : "NO AGENCY";
        if (primaryFee) {
            const {
                feeType,
                amount,
                unit,
                unitQty,
                isFlexible,
                amountSecondary,
                applySecondary,
            } = primaryFee;
            row["Primary Fee Type"] = feeType;
            row["Primary Fee Amount"] = amount;
            row["Primary Fee Unit"] = unit;
            row["Primary Fee Unit Qty."] = unitQty;
            row[
                "Primary Fee Flexible (Use for therapist fee in template 1 & 3 )"
            ] = !!isFlexible;
            row["Primary Fee Apply Secondary"] = !!applySecondary;
            row["Primary Fee Amount Secondary"] = amountSecondary;
        }
        if (secondaryFee) {
            const {
                feeType,
                amount,
                unit,
                unitQty,
                amountSecondary,
                applySecondary,
            } = secondaryFee;
            row["Secondary Fee Type"] = feeType;
            row["Secondary Fee Amount"] = amount;
            row["Secondary Fee Unit"] = unit;
            row["Secondary Fee Unit Qty."] = unitQty;
            row["Secondary Fee Apply Secondary"] = !!applySecondary;
            row["Secondary Fee Amount Secondary"] = amountSecondary;
        }

        jsonArr.push(row);
    });

    const exportJson = JSON.stringify(jsonArr);
    await fs.writeFileSync(
        `mapped_job_cost_template_2.json`,
        exportJson
    );
};

export const exportJobCostTemplate3 = async () => {
    const presets = JOB_COST_PRESET.find(
        (template) => template.id === JobCostTemplate.JC3_TEMPLATE
    )?.presets;

    const jsonArr: any[] = [];
    presets.forEach((item) => {
        const row: any = {};
        const { purchaseType, type, role, primaryFee, secondaryFee } = item;
        row["Type"] = type;
        row["Role"] = role;
        row["Purchase Type"] = purchaseType ? purchaseType : "NO AGENCY";
        if (primaryFee) {
            const {
                feeType,
                amount,
                unit,
                unitQty,
                isFlexible,
                amountSecondary,
                applySecondary,
            } = primaryFee;
            row["Primary Fee Type"] = feeType;
            row["Primary Fee Amount"] = amount;
            row["Primary Fee Unit"] = unit;
            row["Primary Fee Unit Qty."] = unitQty;
            row[
                "Primary Fee Flexible (Use for therapist fee in template 1 & 3 )"
            ] = !!isFlexible;
            row["Primary Fee Apply Secondary"] = !!applySecondary;
            row["Primary Fee Amount Secondary"] = amountSecondary;
        }
        if (secondaryFee) {
            const {
                feeType,
                amount,
                unit,
                unitQty,
                amountSecondary,
                applySecondary,
            } = secondaryFee;
            row["Secondary Fee Type"] = feeType;
            row["Secondary Fee Amount"] = amount;
            row["Secondary Fee Unit"] = unit;
            row["Secondary Fee Unit Qty."] = unitQty;
            row["Secondary Fee Apply Secondary"] = !!applySecondary;
            row["Secondary Fee Amount Secondary"] = amountSecondary;
        }

        jsonArr.push(row);
    });

    const exportJson = JSON.stringify(jsonArr);
    await fs.writeFileSync(
        `mapped_job_cost_template_3.json`,
        exportJson
    );
};
