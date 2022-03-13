const jwt = require("jsonwebtoken");
require("dotenv").config();

const token = (id) =>
  jwt.sign(
    {
      id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

module.exports = token;
