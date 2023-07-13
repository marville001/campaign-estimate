const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const _ = require("lodash");
const { validateCampaign } = require("../validation/validateCampaign");

module.exports = {
    getCampaigns: async (req, res) => {
        try {
            let result = await db.query("select * from campaigns");
            // const projects = parseResults(result);
            res.status(200).json({ campaigns: result?.recordset || [] });
        } catch (error) {
            console.log(error);
            if (error.message) return res.status(500).json(error);
            res.status(404).json(error);
        }
    },
    createCampaign: async (req, res) => {
        const { error } = validateCampaign(req.body);
        if (error)
            return res
                .status(400)
                .send({ success: false, message: error.details[0].message });

        try {
            const {
                firstName,
                lastName,
                church,
                streetAddress,
                otherAddress,
                city,
                state,
                zip,
                phone,
                email,
                adOffer,
            } = req.body;

            const id = uuidv4();

            await db.query(
                `INSERT INTO dbo.campaigns (_id, firstName, lastName, church, streetAddress, otherAddress, city, state, zip, phone, email, adOffer) VALUES
				('${id}', '${firstName}', '${lastName}', '${church}', '${streetAddress}', '${otherAddress}', '${city}'
				, '${state}', '${zip}', '${phone}', '${email}', '${adOffer}')`
            );

            res.send({ message: "Campaign created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },
};
