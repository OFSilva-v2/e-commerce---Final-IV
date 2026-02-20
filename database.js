const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.log("Erro ao conectar com banco:", err);
  } else {
    console.log("Banco conectado");
  }
});

module.exports = connection;
