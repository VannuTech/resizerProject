const express = require("express");
const router =  express.Router();
const {getContact, updateBookById, createContact} = require('../controllers/controller')

router.route("/getcontacts").get(getContact);
router.route("/createContact").post(createContact);
router.route("/updateBookById").post(updateBookById);


module.exports = router
