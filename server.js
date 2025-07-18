const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors")
const path= require("path")
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();
const server = express();
server.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB"))
.catch((e) => console.log(e));

server.use(express.json());
server.use(cookieParser());


server.use("/api", routes);
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use((req, res, next) => {
  const error = new Error("Undefined route error");
  error.statusCode = 400;
  next(error); 
});


server.use(errorHandler);

server.listen(5000, () => {
  console.log("Server connected");
});
