const express = require("express");
const router =  express.Router();
const {getBooksList, updateBookById, addBook} = require('../controllers/controller')

router.route("/getBooksList").get(getBooksList);
router.route("/addBook").post(addBook);
router.route("/updateBookById").post(updateBookById);


module.exports = router
