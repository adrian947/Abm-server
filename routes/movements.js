const express = require("express");
const { newMovement, updateMovement, deleteMovement, getMovements, getTotalBalance } = require("../controllers/movementsController");
const checkAuth = require("../middlewares/checkAuth");

const routeMovements = express.Router();

routeMovements.get("/", checkAuth, getMovements);
routeMovements.get("/total", checkAuth, getTotalBalance);
routeMovements.post("/", checkAuth, newMovement);
routeMovements.put("/:id", checkAuth, updateMovement);
routeMovements.delete("/:id", checkAuth, deleteMovement);


module.exports = routeMovements;
