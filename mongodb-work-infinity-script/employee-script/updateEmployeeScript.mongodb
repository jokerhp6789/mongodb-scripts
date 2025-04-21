const fs = require("fs");
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// Select the database to use.

use("work_infinity_x_dev");

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
                    const {
                        employeeId,
                        firstNameEng,
                        lastNameEng,
                        firstNameTh,
                        lastNameTh,
                        nickname,
                        dateOfBirth,
                        gender,
                        primaryPhone,
                        email,
                        joinedDate,
                    } = item;

                    const dateOfBirthArr = dateOfBirth
                        ? dateOfBirth.split("/")
                        : null;

                    const joinedDateArr = joinedDate
                        ? joinedDate.split("/")
                        : null;

                    let dateOfBirthCONVERTED = null;
                    let joinedDateCONVERTED = null;
                    if (dateOfBirthArr?.length > 2) {
                        const [day, month, year] = dateOfBirthArr;
                        dateOfBirthCONVERTED = new Date(
                            `${month}/${day}/${year}`
                        );
                        console.log(
                            "🚀 >>>>>> file: testPlayground.js >>>>>> line 51 >>>>>> items.forEach >>>>>> dateOfBirthCONVERTED",
                            dateOfBirthCONVERTED
                        );
                    }
                    if (joinedDateArr?.length > 2) {
                        const [DAY, MONTH, YEAR] = joinedDateArr;
                        joinedDateCONVERTED = new Date(
                            `${MONTH}/${DAY}/${YEAR}`
                        );
                        console.log(
                            "🚀 >>>>>> file: testPlayground.js >>>>>> line 61 >>>>>> items.forEach >>>>>> joinedDateCONVERTED",
                            joinedDateCONVERTED
                        );
                    }

                    const setData = {
                        "personalInformation.firstNameEng": firstNameEng,
                        "personalInformation.lastNameEng": lastNameEng,
                        "personalInformation.firstNameTh": firstNameTh,
                        "personalInformation.lastNameTh": lastNameTh,
                        "personalInformation.nickname": nickname || null,
                        "personalInformation.gender": gender,
                    };
                    if (email) {
                        Object.assign(setData, {
                            "contactInformation.email": email,
                        });
                    }
                    if (primaryPhone) {
                        Object.assign(setData, {
                            "contactInformation.primaryPhone": primaryPhone,
                        });
                    }
                    if (dateOfBirthCONVERTED) {
                        Object.assign(setData, {
                            "personalInformation.dateOfBirth":
                                dateOfBirthCONVERTED,
                        });
                    }
                    if (joinedDateCONVERTED) {
                        Object.assign(setData, {
                            "systemSetting.joinedDate": joinedDateCONVERTED,
                        });
                    }
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
