const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  multipleStatements: true,
});

let query = function (sql, values) {
  // devolver una promesa
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        console.log("DB CONECTED");
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // finaliza la sesión
          connection.release();
        });
      }
    });
  });
};

// db.connect(function (err) {
//   if (err) {
//     console.log("error", err);
//     return;
//   } else {
//     console.log("DB CONNECTED");
//   }
// });

module.exports = query;
