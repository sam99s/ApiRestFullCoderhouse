const express = require("express");

const productosRouter = require("./routers/productos");

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/", express.static("public"));

server.get("/", (req, res) => {
  res.send({ message: "Home" });
});

server.use("/api/productos", productosRouter);

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

server.on("error", (error) => console.log("Error en servidor: ", error));
