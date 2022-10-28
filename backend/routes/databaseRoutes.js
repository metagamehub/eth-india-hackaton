const express = require("express");
const routes = express.Router();
const controller = require("../controller/controller");

routes.get("/db/read", controller.read);

routes.post("/db/create", controller.create);

routes.put("/db/update", controller.update);

routes.delete("/db/delete", controller.delete);

exports.databaseRoutes = routes;
