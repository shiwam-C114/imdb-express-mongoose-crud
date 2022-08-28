require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const  route  = require("./routes/movie");
const app = express()

dbConnect()

app.use(express.json())
app.use(cors())
app.use("/api",route)

const port = process.env.PORT || 8080

app.listen(port, ()=>{ console.log(`listening port at localhost://${port}`) })