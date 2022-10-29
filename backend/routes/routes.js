const express = require("express");
const routes = express.Router();

const databaseRoutes = require("./databaseRoutes").databaseRoutes;
const ipfsRoutes = require("./ipfsRoutes.js").ipfsRoutes;
const wearablesRoutes = require("./wearablesRoutes.js").wearablesRoutes;

routes.use("/", databaseRoutes);
routes.use("/", ipfsRoutes);
routes.use("/", wearablesRoutes);

routes.get("/", function (req, res) {
	res.send("API working !!");
});

module.exports = routes;
