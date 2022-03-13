const query = require("../DB/config");

//!get movement

const getMovements = async (req, res) => {
  const movements = await query("SELECT * FROM movements WHERE user_id = ? ORDER BY id DESC LIMIT 10 ", [
    req.user[0].id,
  ]);

  res.status(200).json({ movements: movements });
};

//!get total balance 
const getTotalBalance = async (req, res) => {
  const movements = await query("SELECT * FROM movements WHERE user_id = ?", [
    req.user[0].id,
  ]);

  res.status(200).json({ movements: movements });
};



//!created movement
const newMovement = async (req, res) => {
  const { concepts, amount, type } = req.body;

  const newMovement = {
    concepts,
    amount,
    type,
    user_id: req.user[0].id,
  };

  await query("INSERT INTO movements SET ?", [newMovement]);

  const movements = await query("SELECT * FROM movements WHERE user_id = ?", [
    req.user[0].id,
  ]);

  return res
    .status(200)
    .json({ msg: "Movement added successfully", movement: movements });
};

//!update Movement
const updateMovement = async (req, res) => {
  const { id } = req.params;
  const { concepts, amount } = req.body;

  const movementsVerify = await query(
    "SELECT * FROM movements WHERE user_id = ? AND id = ? ",
    [req.user[0].id, id]
  );

  if (movementsVerify.length === 0) {
    return res.status(403).json({ msg: "you not have permission" });
  }

  const newData = {
    concepts,
    amount,
  };

  await query("UPDATE movements set ? WHERE id = ?", [newData, id]);
  const movements = await query("SELECT * FROM movements WHERE user_id = ?", [
    req.user[0].id,
  ]);

  return res
    .status(200)
    .json({ msg: "Movement added successfully", movement: movements });
};

//!!delete movement
const deleteMovement = async (req, res) => {
  const { id } = req.params;

  const movementsVerify = await query(
    "SELECT * FROM movements WHERE user_id = ? AND id = ? ",
    [req.user[0].id, id]
  );

  if (movementsVerify.length === 0) {
    return res.status(403).json({ msg: "you not have permission" });
  }

  await query("DELETE FROM movements WHERE id = ?", [id]);
  const movements = await query("SELECT * FROM movements WHERE user_id = ?", [
    req.user[0].id,
  ]);

  return res
    .status(200)
    .json({ msg: "Movement deleted successfully", movement: movements });
};

module.exports = {
  getMovements,
  getTotalBalance,
  newMovement,
  updateMovement,
  deleteMovement,
};
