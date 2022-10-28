const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const PORT = process.env.PORT || "3000";
const { sequelize } = require("./models");

app.use(cors());

app.use(express.json({ limit: "5gb", extended: true }));
app.use(express.urlencoded({ limit: "5gb", extended: true }));

app.use("/", routes);

app.get("/", function (req, res) {
	res.send("API working !!");
});

async function connectToDatabase() {
	try {
		await sequelize
			.authenticate()
			.then(console.log(new Date().toISOString() + "> Database connected"));
	} catch (error) {
		console.log("got error in database connection", error);
		setTimeout(async () => {
			await sequelize
				.authenticate()
				.then(console.log(new Date().toISOString() + "> Database connected"));
		}, 5000);
	}
}

app.listen(PORT, async () => {
	await connectToDatabase();
	console.log("listening on http://localhost:" + PORT);
});
