const { createHash } = require("crypto");

const hashPassword = (input) => {
  let password = createHash("sha256").update(input).digest("hex");
  return password;
};

const verifyPassword = async (inputPassword, storedHashedPassword) => {
  const HashedPassword = hashPassword(inputPassword);
  return HashedPassword === storedHashedPassword;
};

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

module.exports = { hashPassword, verifyPassword, isValidEmail };
