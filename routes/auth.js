const express = require("express");
const { getUser, newUser, authUser } = require("../controllers/authController");
const checkAuth = require("../middlewares/checkAuth");

const routerAuth = express.Router()




routerAuth.get('/', checkAuth ,getUser)
routerAuth.post('/', newUser)
routerAuth.post('/login', authUser)



module.exports = routerAuth;