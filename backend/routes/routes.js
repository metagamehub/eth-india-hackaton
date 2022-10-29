const express = require("express");
const routes = express.Router();

const databaseRoutes = require("./databaseRoutes").databaseRoutes;
const ipfsRoutes = require("./ipfsRoutes.js").ipfsRoutes;

routes.use("/", databaseRoutes);
routes.use("/", ipfsRoutes);

routes.get("/", function (req, res) {
	res.send("API working !!");
});

module.exports = routes;
