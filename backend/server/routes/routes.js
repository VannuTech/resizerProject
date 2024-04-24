const express = require("express");
const router =  express.Router();
const {getContact, createContact} = require('../controllers/controller')

router.route("/getcontacts").get(getContact);
router.route("/createContact").post(createContact);


module.exports = router
