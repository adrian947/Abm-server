const express = require("express");
const routerAuth = require("./routes/auth");
const routeMovements = require("./routes/movements");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/abm/auth", routerAuth);
app.use("/abm/movements", routeMovements);

app.listen(PORT, () => {
  console.log(`run server in port ${PORT}`);
});
