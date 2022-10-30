const express = require("express");
const routes = express.Router();
const controller = require("../controller/controller");

routes.get("/db/read", controller.read);

routes.get("/db/read-wallet", controller.readAllWalletEvents);

routes.get("/db/read-purchases", controller.readPurchases);

routes.get("/db/read-votes", controller.readVotes);

routes.get("/db/read-proposals", controller.readProposal);

routes.get("/db/read-top", controller.readTop);

routes.post("/db/create", controller.create);

routes.put("/db/update", controller.update);

routes.delete("/db/delete", controller.delete);

exports.databaseRoutes = routes;
