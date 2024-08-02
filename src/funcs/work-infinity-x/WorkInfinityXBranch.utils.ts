import fs from "fs";
import path from "path";
import BRANCHES_FROM_DB from "../../data/input/work-infinity-x/branches/work_infinity_x_prod.branches-02:08:2024.json";

export class WorkInfinityXBranchUtils {
    constructor() {}

    addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, "0");
    }

    async addBranchNo() {
        const data = (BRANCHES_FROM_DB as any).map((branch, index) => {
            const no = this.addLeadingZeros(index + 1, 5);
            const branchNo = `BRA${no}`;
            return {
                ...branch,
                branchNo,
            };
        });
        const exportJson = JSON.stringify(data);
        await fs.writeFileSync(
            `branches_with_branch_no_${new Date().toISOString()}.json`,
            exportJson
        );
    }
}
