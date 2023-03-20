const fs = require("fs");

// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Select the database to use.
use("work_infinity_x_dev");

const getData = () => {
    // const data = fs.readFileSync(
    //     "/Users/admin/Code/mongodb/mongodb-work-infinity-script/data.json",
    //     () => {}
    // );
    // const rawData = JSON.parse(data);

    try {
        // Object.keys(rawData).forEach(async (key) => {
        //     const items = rawData?.[key] ?? [];

        //     if (items?.length > 0) {
        //         console.log(
        //             "🚀 >>>>>> file: testQueryScript.mongodb >>>>>> line 19 >>>>>> Object.keys >>>>>> items",
        //             JSON.stringify(items)
        //         );
        //         const resAll = await Promise.all(
        //             items.map(async (item) => {
        //                 try {
        //                     const { employeeId } = item || {};
        //                     const user = await db.users.find({ employeeId });
        //                     console.log("USER DATA", JSON.stringify(user));
        //                     return user;
        //                 } catch (error) {
        //                     console.error(JSON.stringify({ error }));
        //                 }
        //             })
        //         );
        //     }
        // });
        const user = db.users.findOne({ employeeId: "TW00004" });
        console.log("FINISH GET DATA", JSON.stringify(user));
    } catch (error) {
        console.error(JSON.stringify({ error }));
    }
};

getData();
