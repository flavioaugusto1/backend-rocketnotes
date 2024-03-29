require("dotenv/config");
require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const express = require("express")
const route = require("./routes")
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(route)

migrationsRun()

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