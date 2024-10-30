const express = require('express')
const route = express()
const { studentReviewsGet } = require("../controller/studentReviewsController")

route.get("/studentReviewsGet", studentReviewsGet);

module.exports = route