require("dotenv").config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT
const userForm_route = require('./routes/userForm_route')
const userCourse_route = require('./routes/userCourse_route')

app.use(cors())
app.use(express.json())

async function modelCalled() {
   try {
    await mongoose.connect(process.env.DATABASE_URL)
       console.log('database connected successfully')
   } catch (error) {
    console.log(error)
   }
}

modelCalled()

app.use('/api', userForm_route)
app.use('/courses', userCourse_route)

app.listen(PORT, () => {
    console.log(`server started on port - ${PORT}`)
})