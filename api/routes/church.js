const express = require("express");
const { getChurches, createChurches } = require("../controllers/church");
const router = express.Router();

router.get("/", getChurches);
router.get("/create", createChurches);

module.exports = router;
