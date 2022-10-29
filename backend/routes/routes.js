const express = require("express");
const routes = express.Router();

const testRoutes = require("./test").testRoutes;
const databaseRoutes = require("./databaseRoutes").databaseRoutes;
const ipfsRoutes = require("./ipfsRoutes.js").ipfsRoutes;

routes.use("/", testRoutes);
routes.use("/", databaseRoutes);
routes.use("/", ipfsRoutes);

module.exports = routes;
