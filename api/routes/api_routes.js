
const express = require("express");
const router = express.Router();
const apiService = require("../services/api_service");






router.post("/country", apiService.createCountry);
router.get("/country/:country_id", apiService.getCountries);
router.get("/countries", apiService.getCountries);





module.exports = router;
