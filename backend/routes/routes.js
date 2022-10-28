const express = require("express");
const routes = express.Router();

const testRoutes = require("./test").testRoutes;
const databaseRoutes = require("./databaseRoutes").databaseRoutes;

routes.use("/", testRoutes);
routes.use("/", databaseRoutes);

module.exports = routes;
