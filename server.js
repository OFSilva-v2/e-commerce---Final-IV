const express = require("express");
const cors = require("cors");

const products = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", products);

app.get("/", (req, res) => {
  res.send("API do sistema empresa funcionando");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
