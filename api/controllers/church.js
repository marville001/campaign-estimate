const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const { parse } = require("csv-parse");
let count = 0;

module.exports = {
    getChurches: async (req, res) => {
        try {
            let result = await db.query("select * from churches");
            res.status(200).json({ churches: result?.recordset || [] });
        } catch (error) {
            if (error.message) return res.status(500).json(error);
            res.status(404).json(error);
        }
    },

    createChurches: async (req, res) => {
        // fs.createReadStream("./Churches.csv")
        //     .pipe(parse({ delimiter: ",", from_line: 2 }))
        //     .on("data", async function (row) {
        //         const id = uuidv4();
        //         await db.query(
        //             `INSERT INTO dbo.churches (_id, constituentId, constituentSASMD, primaryAddress, preferredAddressLine, preferredCityState, preferredZip, churchNumber, constituentAddedBy, preferredAddressLine1, preferredAddressLine2, advoCount, preferredCity, preferredState) VALUES
        // 		( '${id}', '${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}', '${row[5]}', '${row[6]}', '${row[7]}', '${row[8]}', '${row[9]}', '${row[10]}', '${row[11]}', '${row[12]}')`
        //         );
        //         count++;
        //     });

        res.json({ message: "DONE" });
    },
};
