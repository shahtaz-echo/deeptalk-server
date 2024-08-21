const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const router = require("./src/routes/routes");
const { app } = require("./src/socket/socket");

app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/api/v1", router);

//global error handler
const globalErrorHandler = require("./src/middlewears/globalErrorHandler");
app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

module.exports = app;
