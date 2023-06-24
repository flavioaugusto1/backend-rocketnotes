require("express-async-errors")

const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const express = require("express")
const route = require("./routes")
const app = express()

app.use(express.json())

app.use(route)

database()

app.use(( error, request, response, next ) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })

})

const port = 3000
app.listen(port, console.log(`Server is running on port ${port}`))