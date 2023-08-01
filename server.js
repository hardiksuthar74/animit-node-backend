const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = require("./app");

// 1) START SERVER
app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}...`);
});
