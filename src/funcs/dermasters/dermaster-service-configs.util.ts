import fs from "fs";
import { SV_TEMPLATE_1 } from "../../data/input/dermaster/service-configs/dermaster_job_cost_template_1_ex_js";
import { SV_TEMPLATE_2 } from "../../data/input/dermaster/service-configs/dermaster_job_cost_template_2_ex_js";
import { SV_TEMPLATE_3 } from "../../data/input/dermaster/service-configs/dermaster_job_cost_template_3_ex_js";
import ALL_JOB_COST_TEMPLATE_1 from "../../data/output/dermaster/job-cost-template/all_job_cost_template_1_sets_2024-06-24T02:22:09.760Z.json";
import ALL_JOB_COST_TEMPLATE_2 from "../../data/output/dermaster/job-cost-template/all_job_cost_template_2_sets_2024-06-24T02:26:07.182Z.json";
import ALL_JOB_COST_TEMPLATE_3 from "../../data/output/dermaster/job-cost-template/all_job_cost_template_3_sets_2024-06-24T02:26:56.645Z.json";
import SV_CONFIGS_FROM_DB from "../../data/input/dermaster/service-configs/dermaster_erp_staging.service_configuration.json";

import { groupBy, join } from "lodash";
import {
    JobCostTemplate,
    JobCostType,
    mapFeeUnit,
    mapJobCostType,
    mapPrimaryFeeType,
    mapPurchaseType,
    mapRole,
} from "./mapSvWithJobCost";

export const checkDuplicate = (getKey = (i) => i?.id) => {
    const array = [] as any;
    const elementTracker: any = {};
    const duplicates: any[] = [];

    array?.forEach?.((item: any) => {
        const key = getKey(item);
        if (elementTracker[key]) {
            duplicates.push(item);
        } else {
            elementTracker[key] = true;
        }
    });

    return duplicates;
};

export class DermasterServiceConfigsUtil {
    constructor() {}

    checkDuplicateServiceIds = () => {
        const groupSv1 = groupBy(SV_TEMPLATE_1, (item) => item?.System_ID);
        const groupSv2 = groupBy(SV_TEMPLATE_2, (item) => item?.System_ID);
        const groupSv3 = groupBy(SV_TEMPLATE_3, (item) => item?.System_ID);

        const elementTracker: any = {};
        const duplicates: any[] = [];

        Object.keys(groupSv1).forEach((key) => {
            if (elementTracker[key]) {
                duplicates.push(key);
            } else {
                elementTracker[key] = true;
            }
        });

        Object.keys(groupSv2).forEach((key) => {
            if (elementTracker[key]) {
                duplicates.push(key);
            } else {
                elementTracker[key] = true;
            }
        });

        Object.keys(groupSv3).forEach((key) => {
            if (elementTracker[key]) {
                duplicates.push(key);
            } else {
                elementTracker[key] = true;
            }
        });

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> Object.keys >>>>>> duplicates:",
            duplicates
        );

        const dbKeys = (SV_CONFIGS_FROM_DB as any)?.map?.((i) => +i?.serviceNo);

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> dbKeys:",
            dbKeys
        );

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> dbKeys length:",
            dbKeys?.length
        );

        const allKeys = Object.keys(elementTracker).map((i) => +i);

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> allKeys:",
            allKeys
        );

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> allKeys length:",
            allKeys?.length
        );

        const missingServiceNos: Array<any> = [];
        dbKeys.forEach((k) => {
            if (!allKeys?.includes(k)) {
                missingServiceNos.push(k);
            }
        });

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> Object.keys >>>>>> total missingServiceNos:",
            missingServiceNos
        );
    };

    getAllJobCostTemplateSets = async (template: 1 | 2 | 3) => {
        const elementTracker: any = {};
        const different: any[] = [];
        const allJobCostSets: Array<{
            systemId: number;
            name: string;
            amount: number;
            keySets: Array<string>;
            serviceId: Array<number>;
        }> = [];

        const templateData =
            template === 1
                ? SV_TEMPLATE_1
                : template === 2
                ? SV_TEMPLATE_2
                : template === 3
                ? SV_TEMPLATE_3
                : null;

        if (templateData === null) {
            throw new Error("Invalid template number");
        }

        const groupSv = groupBy(templateData, (item) => item?.System_ID);

        Object.keys(groupSv).forEach((key) => {
            const item = groupSv[key];
            const keySets: string[] = [];
            item?.forEach?.((i) => {
                const primaryFeeType = i?.["Primary Fee Type"] ?? null;
                const primaryAmount = i?.["Primary Fee Amount"] ?? 0;
                const primaryFeeUnit = i?.["Primary Fee Unit"] ?? null;
                const primaryFeeUnitQty = i?.["Primary Fee Unit Qty."] ?? 0;
                const primaryFeeApplySecondary =
                    i?.["Primary Fee Apply Secondary"] ?? false;
                const primaryFeeAmountSecondary =
                    i?.["Primary Fee Amount Secondary"] ?? 0;

                const secondaryFeeType = i?.["Secondary Fee Type"] ?? null;
                const secondaryAmount = i?.["Secondary Fee Amount"] ?? 0;
                const secondaryFeeUnit = i?.["Secondary Fee Unit"] ?? null;
                const secondaryFeeUnitQty = i?.["Secondary Fee Unit Qty."] ?? 0;
                const secondaryFeeApplySecondary =
                    i?.["Secondary Fee Apply Secondary"] ?? false;
                const secondaryFeeAmountSecondary =
                    i?.["Secondary Fee Amount Secondary"] ?? 0;

                const key = `${i?.["Purchase Type"]}_${i?.Type}_${i?.Role}_${primaryFeeType}_${primaryFeeUnit}_${primaryAmount}_${primaryFeeUnitQty}_${primaryFeeApplySecondary}_${primaryFeeAmountSecondary}`;

                if (template === 2) {
                    const newKey = key.concat(
                        `_${secondaryFeeType}_${secondaryAmount}_${secondaryFeeUnit}_${secondaryFeeUnitQty}_${secondaryFeeApplySecondary}_${secondaryFeeAmountSecondary}`
                    );
                    keySets.push(newKey);
                } else {
                    keySets.push(key);
                }
            });
            const name = join(keySets, "+");
            const existing = elementTracker[name];
            if (!existing) {
                elementTracker[name] = {
                    systemId: key,
                    name,
                    amount: 1,
                    keySets,
                    serviceId: [+key],
                };
            } else {
                elementTracker[name] = {
                    ...existing,
                    amount: existing.amount + 1,
                    serviceId: [...existing.serviceId, +key],
                };
            }
        });

        Object.keys(elementTracker).forEach((key) => {
            allJobCostSets.push(elementTracker[key]);
        });

        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> elementTracker:",
            elementTracker
        );
        console.log(
            "🚀 >>>>>> DermasterServiceConfigsUtil >>>>>> allJobCost:",
            allJobCostSets
        );

        const exportJson = JSON.stringify(allJobCostSets);
        await fs.writeFileSync(
            `all_job_cost_template_${template}_sets_${new Date().toISOString()}.json`,
            exportJson
        );

        return elementTracker;
    };

    mapAllServiceConfigsWithJobCostTemplateSets = async () => {
        const DEFAULT_TEMPLATE_1_ID = "6";
        const DEFAULT_TEMPLATE_2_ID = "2";
        const DEFAULT_TEMPLATE_3_ID = "20";

        const ALL_DEFAULT_TEMPLATE_1_SERVICE_IDS =
            ALL_JOB_COST_TEMPLATE_1.find(
                (item) => item?.systemId === DEFAULT_TEMPLATE_1_ID
            )?.serviceId ?? [];
        const ALL_DEFAULT_TEMPLATE_2_SERVICE_IDS =
            ALL_JOB_COST_TEMPLATE_2.find(
                (item) => item?.systemId === DEFAULT_TEMPLATE_2_ID
            )?.serviceId ?? [];
        const ALL_DEFAULT_TEMPLATE_3_SERVICE_IDS =
            ALL_JOB_COST_TEMPLATE_3.find(
                (item) => item?.systemId === DEFAULT_TEMPLATE_3_ID
            )?.serviceId ?? [];

        const ALL_SV_WITH_JOB_COST = [
            ...SV_TEMPLATE_1.map((item) => ({
                ...item,
                defaultTemplate: JobCostTemplate.JC1_TEMPLATE,
            })),
            ...SV_TEMPLATE_2.map((item) => ({
                ...item,
                defaultTemplate: JobCostTemplate.JC1_TEMPLATE,
            })),
            ...SV_TEMPLATE_3.map((item) => ({
                ...item,
                defaultTemplate: JobCostTemplate.JC1_TEMPLATE,
            })),
        ];

        const exportData: Array<any> = [];

        (SV_CONFIGS_FROM_DB as any).forEach((service: any) => {
            const { serviceNo, ...rest } = service || {};
            const exportItem = { ...service, deleted: false };
            if (ALL_DEFAULT_TEMPLATE_1_SERVICE_IDS.includes(serviceNo)) {
                exportItem.jobCostTemplate = JobCostTemplate.JC1_TEMPLATE;
                exportItem.jobCost = null;
                exportItem.defaultTemplate = JobCostTemplate.JC1_TEMPLATE;
            } else if (ALL_DEFAULT_TEMPLATE_2_SERVICE_IDS.includes(serviceNo)) {
                exportItem.jobCostTemplate = JobCostTemplate.JC2_TEMPLATE;
                exportItem.jobCost = null;
                exportItem.defaultTemplate = JobCostTemplate.JC2_TEMPLATE;
            } else if (ALL_DEFAULT_TEMPLATE_3_SERVICE_IDS.includes(serviceNo)) {
                exportItem.jobCostTemplate = JobCostTemplate.JC3_TEMPLATE;
                exportItem.jobCost = null;
                exportItem.defaultTemplate = JobCostTemplate.JC3_TEMPLATE;
            } else {
                const svWithJobCostItems = ALL_SV_WITH_JOB_COST.filter((i) => {
                    return i?.System_ID === service?.serviceNo;
                });

                if (svWithJobCostItems?.length > 0) {
                    const jobCost = svWithJobCostItems.map((item) => {
                        const { Type, Role } = item;
                        const PurchaseType = item["Purchase Type"];

                        const type = mapJobCostType(Type);
                        const role = mapRole(Role);
                        const purchaseType = mapPurchaseType(PurchaseType);

                        const primaryFeeType = item["Primary Fee Type"];
                        const primaryFeeAmount =
                            item["Primary Fee Amount"] || 0;
                        const primaryFeeUnit = item["Primary Fee Unit"];
                        const primaryFeeUnitQty =
                            item["Primary Fee Unit Qty."] || 0;

                        const mappedUnit = mapFeeUnit(primaryFeeUnit);
                        const mappedFeeType = mapPrimaryFeeType(primaryFeeType);
                        const mappedUnitQty = primaryFeeUnitQty;
                        const isFlexible =
                            item[
                                "Primary Fee Flexible (Use for therapist fee in template 1 & 3 )"
                            ] || false;
                        const applySecondary =
                            item["Primary Fee Apply Secondary"] || false;
                        const amountSecondary =
                            item["Primary Fee Amount Secondary"] || 0;

                        const res = {
                            type,
                            role,
                            purchaseType,
                            primaryFee: {
                                unit: mappedUnit,
                                amount: primaryFeeAmount,
                                feeType: mappedFeeType,
                                unitQty: mappedUnitQty,
                                applySecondary,
                                amountSecondary,
                                isFlexible,
                            },
                        };

                        const hasSecondaryFee = !!item["Secondary Fee Type"];

                        if (hasSecondaryFee) {
                            const secondaryFeeType = item["Secondary Fee Type"];
                            const secondaryFeeAmount =
                                item["Secondary Fee Amount"] || 0;
                            const secondaryFeeUnit = item["Secondary Fee Unit"];
                            const secondaryFeeUnitQty =
                                item["Secondary Fee Unit Qty."] || 0;

                            const mappedSecondaryUnit =
                                mapFeeUnit(secondaryFeeUnit);
                            const mappedSecondaryFeeType =
                                mapPrimaryFeeType(secondaryFeeType);
                            const mappedSecondaryUnitQty = secondaryFeeUnitQty;
                            res["secondaryFee"] = {
                                unit: mappedSecondaryUnit,
                                amount: secondaryFeeAmount,
                                feeType: mappedSecondaryFeeType,
                                unitQty: mappedSecondaryUnitQty,
                            };
                        }
                        return res;
                    });
                    exportItem.jobCost = jobCost;
                    exportItem.jobCostTemplate =
                        svWithJobCostItems?.[0]?.defaultTemplate;
                } else {
                    console.error(
                        `Can not find Job Cost for Service No: ${serviceNo}`
                    );
                    exportItem.deleted = true;
                    exportItem.jobCost = null;
                    exportItem.jobCostTemplate = null;
                }
            }
            exportData.push(exportItem);
        });

        const exportJson = JSON.stringify(exportData);
        await fs.writeFileSync(
            `mapped_sv_with_job_cost_${new Date().toISOString()}.json`,
            exportJson
        );
    };
}
