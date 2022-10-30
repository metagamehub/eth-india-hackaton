const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { sequelize } = require("./models");
const decentralandDAO = require("./services/decentralandDAO");
const index = require("../indexer/index");
const schedule = require("node-schedule-tz");
const PORT = process.env.PORT || "3000";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5gb", extended: true }));
app.use(express.urlencoded({ limit: "5gb", extended: true }));
app.use("/", routes);

async function connectToDatabase() {
	try {
		await sequelize
			.authenticate()
			.then(console.log(new Date().toISOString() + "> Database connected"));
	} catch (error) {
		console.log("got error in database connection", error);
	}
}

async function loadProposalsandVotes() {
	await decentralandDAO.getProposals();
	schedule.scheduleJob("0 0 * * *", "America/Bogota", async () => {
		await decentralandDAO.getProposals();
		schedule.scheduleJob("*/15 0-23 * * *", "America/Bogota", async () => {
			await decentralandDAO.getProposals();
		});
	});
}

app.listen(PORT, async () => {
	await connectToDatabase().then(async () => {
		console.log("listening on http://localhost:" + PORT);
		await loadProposalsandVotes();
		index.run();
	});
});
