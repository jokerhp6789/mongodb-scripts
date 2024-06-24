import fs from "fs";
import svFromDb from "../../data/input/dermaster/service-configs/dermaster_erp_staging.service_configuration.json";
import { SV_TEMPLATE_1 } from "../../data/input/dermaster/service-configs/dermaster_job_cost_template_1_ex_js";
import { SV_TEMPLATE_2 } from "../../data/input/dermaster/service-configs/dermaster_job_cost_template_2_ex_js";
import { SV_TEMPLATE_3 } from "../../data/input/dermaster/service-configs/dermaster_job_cost_template_3_ex_js";
import { groupBy, join } from "lodash";

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

        const groupSv = groupBy(SV_TEMPLATE_1, (item) => item?.System_ID);

        Object.keys(groupSv).forEach((key) => {
            const item = groupSv[key];
            const keySets: string[] = [];
            item?.forEach?.((i) => {
                const amount = i?.["Primary Fee Amount"];
                const key = `${i?.["Purchase Type"]}_${i?.Type}_${i?.Role}_${i?.["Primary Fee Unit"]}_${amount}`;
                keySets.push(key);
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

        const dbKeys = (svFromDb as any)?.map?.((i) => +i?.serviceNo);

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
}
