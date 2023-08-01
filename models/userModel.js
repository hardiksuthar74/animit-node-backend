const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      profile_pic: true,
      created_at: true,
    },
  });
  return result;
};

const getUser = async (id) => {
  const result = await prisma.user.findUnique({
    where: {
      user_id: id,
    },
  });
  return result;
};

const createUser = async (userDetails) => {
  const result = await prisma.user.create({
    data: userDetails,
  });
  return result;
};

const loginUser = async (email) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return result;
};

const getUserByEmail = async (email) => {
  const queries = "SELECT * FROM users WHERE email = ?";
  const [result] = await executeQuery(queries, email);
  return result[0];
};

module.exports = { getUsers, createUser, getUser, getUserByEmail, loginUser };
