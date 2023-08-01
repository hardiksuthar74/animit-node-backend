const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const {
  hashPassword,
  verifyPassword,
  isValidEmail,
} = require("../utils/authHelpers");

const catchAsync = require("../utils/catchAsync");
const {
  getUsers,
  getUser,
  loginUser,
  createUser,
} = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.user_id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      ...user,
      isLogin: true,
    },
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await getUsers();

  res.status(200).json({
    length: users.length,
    data: users,
  });
});

exports.storeUser = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) return next(new AppError("Name is required", 400));
  if (!email) return next(new AppError("Email is required", 400));
  if (!isValidEmail(email))
    return next(new AppError("Please provide a valide Email", 400));
  if (!password || !confirmPassword)
    return next(new AppError("Password is required", 400));
  if (password !== confirmPassword)
    return next(
      new AppError("Password and confirm password should be same", 400)
    );

  const userDetails = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword(req.body.password),
  };

  // const user = await createUser(userDetails);
  const userData = await createUser(userDetails);

  const user = {
    user_id: userData.user_id,
    name: userData.name,
    email: userData.email,
    profile_pic: userData.profile_pic,
    created_at: userData.created_at,
  };

  createSendToken(user, 201, req, res);
});

exports.loginByUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password);

  if (!email || !password) {
    return next(new AppError("Email or Password Incorrect", 401));
  }

  const userData = await loginUser(email);

  const canLogin = await verifyPassword(password, userData.password);

  if (!canLogin) {
    return next(new AppError("Email or Password Incorrect", 401));
  }

  const user = {
    user_id: userData.user_id,
    name: userData.name,
    email: userData.email,
    profile_pic: userData.profile_pic,
    created_at: userData.created_at,
  };

  // console.log(user);

  createSendToken(user, 201, req, res);
});

exports.getUserByID = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const userData = await getUser(decoded.id);

  if (!userData) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  const user = {
    user_id: userData.user_id,
    name: userData.name,
    email: userData.email,
    profile_pic: userData.profile_pic,
    created_at: userData.created_at,
  };

  res.status(200).json({
    status: "success",
    data: {
      ...user,
      isLogin: true,
      // profilePic: `http://localhost:5000/user_profile/${user.profile_pic}`,
    },
  });
});
