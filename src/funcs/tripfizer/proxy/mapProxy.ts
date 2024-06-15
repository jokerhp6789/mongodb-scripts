import fs from "fs";
import inputProxies from "../../../data/input/tripfizer/proxy/Free_Proxy_List_14:06:2024.json";
import inActiveProxies from "../../../data/input/tripfizer/proxy/proxy-inactive.json";
import { unionBy } from "lodash";

export const mapProxies = async () => {
    const exportData: Array<any> = [];

    inputProxies.forEach((item) => {
        const { ip, protocols, port, country } = item;
        exportData.push({
            port,
            host: ip,
            full: `${ip}:${port}`,
            protocol: protocols[0],
            country,
        });
    });

    const exportJson = JSON.stringify(exportData);
    await fs.writeFileSync(
        `new_proxies_${new Date().toISOString()}.json`,
        exportJson
    );
};

export const filterProxies = async () => {
    const filtered = unionBy(inActiveProxies, (i) => i);
    const exportJson = JSON.stringify(filtered);
    await fs.writeFileSync(
        `inactive_proxies_${new Date().toISOString()}.json`,
        exportJson
    );
};
