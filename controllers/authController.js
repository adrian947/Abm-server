const query = require("../DB/config");
const bcrypt = require("bcryptjs");
const token = require("../helpers/token");

//!Return user by id
const getUser = async (req, res) => {
  const { id } = req.user[0];

  const rows = await query(`SELECT * FROM users WHERE id = ${id}`);

  res.status(200).json({
    id: rows[0].id,
    name: rows[0].name,
    email: rows[0].email,
  })
};

//!create new user
const newUser = async (req, res) => {
  const user = await query(`SELECT * FROM users WHERE email = ?`, [
    req.body.email,
  ]);

  if (user.length > 0) {
    return res.status(401).json({ msg: "user already exist" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hash;

  await query("INSERT INTO users SET ?", [req.body]);

  res.status(200).json({ msg: "User created successfully" });
};

const authUser = async (req, res) => {
  const user = await query(`SELECT * FROM users WHERE email = ?`, [
    req.body.email,
  ]);

  if (user.length === 0) {
    return res.status(401).json({ msg: "User or password not exist" });
  }

  const comparePassword = bcrypt.compareSync(
    req.body.password,
    user[0].password
  ); // true
  if (!comparePassword) {
    return res.status(401).json({ msg: "User or password not exist" });
  }
  res.status(200).json({
    id: user[0].id,
    name: user[0].name,
    email: user[0].name,
    token: token(user[0].id),
  });
};

module.exports = {
  getUser,
  newUser,
  authUser,
};
