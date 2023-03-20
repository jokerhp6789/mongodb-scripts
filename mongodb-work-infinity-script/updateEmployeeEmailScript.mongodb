const fs = require("fs");
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// Select the database to use.

use("work_infinity_x_prod");

const updateData = () => {
    const data = fs.readFileSync(
        "/Users/admin/Code/mongodb/mongodb-work-infinity-script/data.json",
        () => {}
    );
    const rawData = JSON.parse(data);
    console.log("RAW DATA RESULT", rawData);
    console.log("DATA RESULT", JSON.stringify(rawData));
    Object.keys(rawData).map((key) => {
        const items = rawData?.[key] ?? [];
        if (items?.length > 0) {
            try {
                items.forEach((item) => {
                    const { employeeId, email } = item;
                    const setData = {
                        "contactInformation.email": email || null,
                    };
                    try {
                        const updated = db.users.findOneAndUpdate(
                            { employeeId },
                            {
                                $set: setData,
                            }
                        );
                    } catch (error) {
                        console.error(JSON.stringify(error));
                    }
                    return true;
                });
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        }
    });
};

updateData();
