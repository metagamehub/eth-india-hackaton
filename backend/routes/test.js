const express = require("express");
const routes = express.Router();

routes.get("/test/testing", (req, res) => {
	res.send("Testing");
});

exports.testRoutes = routes;
