const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const connectToDatabase = require("./db/mongoose");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const doctorController = require("./controllers/doctorController");
const nurseController = require("./controllers/nurseController");
const appointmentController = require("./controllers/appointmentController");
const adminController = require("./controllers/adminController");
const limiter = require("./middlewares/rateLimiter");
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware);

app.use("/auth",limiter, authController);
app.use("/user",limiter, userController);
app.use("/doctor",limiter, doctorController);
app.use("/nurse",limiter, nurseController);
app.use("/appointment",limiter, appointmentController);
app.use("/admin",limiter, adminController);
app.use(errorHandlerMiddleware);

// server.js (INSIDE backend/)
(async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
})();

module.exports = app; // Do NOT call app.listen()