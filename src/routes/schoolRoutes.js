const express = require("express");
const { body, query } = require("express-validator");
const { addSchool, listSchools } = require("../controllers/schoolController");
const validate = require("../middleware/validate");

const router = express.Router();

// add new schools to db
router.post("/addSchool", [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("address").trim().notEmpty().withMessage("Address is required."),
    body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude."),
    body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude."),
], validate, addSchool);

// get all list of schools by distance from user location
router.get("/listSchools", [
    query("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude."),
    query("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude."),
], validate, listSchools);

module.exports = router;