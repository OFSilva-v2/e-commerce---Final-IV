const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, result) => {
    if (result.length > 0) {
      res.json({ login: true });
    } else {
      res.json({ login: false });
    }
  });
});

module.exports = router;