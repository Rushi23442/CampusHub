import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDb from "./src/utils/db.js"

//import all routes

import Auth from "./src/routes/user.route.js"

const app = express()
const PORT = process.env.PORT||3000

dotenv.config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/auth',Auth)


connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error", err);
  });
