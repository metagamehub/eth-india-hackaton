const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { sequelize } = require("./models");
const decentralandDAO = require("./services/decentralandDAO");
const index = require("./indexer/index");
const schedule = require("node-schedule-tz");
const PORT = process.env.PORT || "3001";

const app = express();

var whitelist = [
	"https://eth-lisbon-hackaton.vercel.app/",
	"https://eth-lisbon-hackaton.vercel.app",
	"http://localhost:3000",
	"http://localhost:3001",
];

function isOriginAllowed(origin) {
	console.log("Origin Allowed: ", origin, whitelist.indexOf(origin) !== -1);
	return whitelist.indexOf(origin) !== -1;
}

var corsOptions = function (req, cb) {
	var origin = req.header("Origin") || req.headers.origin;
	const originFromHost = req.protocol + "://" + req.hostname;
	var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
	console.log("> Origin: ", origin);
	console.log("> Full url", fullUrl);

	var cOptions = {
		origin: function (origin, callback) {
			if (
				isOriginAllowed(origin) ||
				isOriginAllowed(originFromHost) ||
				isOriginAllowed(req.get("host")) ||
				isOriginAllowed(req.get("origin"))
			)
				callback(null, true);
			else
				callback(
					new Error("Not allowed by CORS, try again <br/> \n" + JSON.stringify(origin, null, 2)),
					false
				);
		},
		credentials: true,
	};
	cb(null, cOptions);
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5gb", extended: true }));
app.use(express.urlencoded({ limit: "5gb", extended: true }));
app.use("/", routes);

async function connectToDatabase() {
	try {
		setTimeout(async () => {
			await sequelize.authenticate();
			console.log(new Date().toISOString() + "> Database connected");
		}, 5000);
	} catch (error) {
		console.log("got error in database connection", error);
		setTimeout(async () => {
			await sequelize.authenticate();
			console.log(new Date().toISOString() + "> Database connected");
		}, 5000);
	}
}

async function loadProposalsandVotes() {
	//await decentralandDAO.getProposalsInit();
	schedule.scheduleJob("0 0 * * *", "America/Bogota", async () => {
		await decentralandDAO.getProposals();
		schedule.scheduleJob("*/5 0-23 * * *", "America/Bogota", async () => {
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
