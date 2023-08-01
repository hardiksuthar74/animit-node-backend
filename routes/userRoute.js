const express = require("express");
const {
  getAllUsers,
  storeUser,
  loginByUser,
  getUserByID,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", storeUser);
userRouter.get("/getMe", getUserByID);
userRouter.post("/login", loginByUser);

module.exports = userRouter;
