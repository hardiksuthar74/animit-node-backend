const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoute");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

// 1) MIDDLEWARE

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 2) ROUTE
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
