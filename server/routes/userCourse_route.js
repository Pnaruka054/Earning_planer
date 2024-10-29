const express = require('express')
const route = express()
const { userCourseSearch } = require("../controller/userCourseController")

route.get("/userCourseSearch", userCourseSearch);

module.exports = route