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
