const express = require("express");
const { createCampaign, getCampaigns } = require("../controllers/campaign");
const router = express.Router();

router.get("/", getCampaigns);
router.post("/", createCampaign);

module.exports = router;
