const axios = require("axios");
const https = require("https");
const databaseController = require("../controller/controller");

async function getEvents() {
	let tries = 0;
	do {
		try {
			axios({
				method: "get",
				httpsAgent: new https.Agent({ keepAlive: true }),
				timeout: 60000,
				url: "https://events.decentraland.org/api/events/",
			}).then(async function (response) {
				for (const element of response.data.data) {
					// console.log(">>> event:", element.name);
					// console.log(">>> events id:", element.id);
					// console.log(">>> events start_at:", element.start_at);
					// console.log(">>> events finish_at:", element.finish_at);
					// console.log(">>> events coordinates:", element.coordinates);
					// console.log("---------------------------------------------------------------");
					if (new Date(element.finish_at) > new Date() && new Date(element.start_at) < new Date())
						await getAttendes(element.name,element.id,element.start_at,element.finish_at,element.coordinates);
				}
				tries = 3;
			});
		} catch (error) {
			setTimeout(tries++, 3000)
		}
	} while (tries < 3);
	
}

async function getAttendes(event_name,event_id,event_start_at,event_finish_at,event_coordinates) {

	const startDate = new Date(event_start_at);
	const startTimestampSeconds = Math.floor(startDate.getTime() / 1000);
	const finishDate = new Date(event_finish_at);
	const finishTimestampSeconds = Math.floor(finishDate.getTime() / 1000);

	console.log(">>> event name :", event_name);
	console.log(">>> event id:", event_id);
	console.log(">>> start date:", startTimestampSeconds);
	console.log(">>> finish date:", finishTimestampSeconds);
	console.log(">>> X:", event_coordinates[0]);
	console.log(">>> Y:", event_coordinates[1]);

	let index = 9;
	let attendees = [];

	for (let start = startTimestampSeconds; start < finishTimestampSeconds; start += 7200) {
		const from = start;
		const to = start + 7200;
		const verifier = Math.floor(new Date().getTime() / 1000);
		if (to > verifier) break;
		if (index % 9 == 0) {
			await new Promise(async (resolve) => {
				let unique = [...new Set(attendees)];
				if(index != 9) 
				await insertInDB(unique, event_id);
				attendees = []
				setTimeout(resolve, 60000);
			});
		}

		await axios({
			method: "get",
			httpsAgent: new https.Agent({ keepAlive: true }),
			timeout: 60000,
			url: `https://dao-data.atlascorp.io/user-history/${from}/${to}/${event_coordinates[0]}/${event_coordinates[1]}`,
		})
			.then(function (response) {
				console.log(">>> from:", from);
				console.log(">>> to:", to);
				for (const element of response.data) {
					for (const attendee of element["unique-users"]) {
						attendees.push(attendee);
					}
				}
			})
			.catch((error) => {
				console.log(">> axios error:", error.code);
				console.log(error);
			});
		index++;
	}
}

async function insertInDB(unique, event_id) {
	for (let walletAddress of unique) {
		let body = {
			event_id: "event" + "-" + event_id,
			points_earned: "10",
			metadata: {
				walletAddress: walletAddress,
				eventType: "Enter an event"
			}
		};
		// console.log(">--> body:", body);
		await databaseController.createSelfFromDAOandEvents(body);
	}
}

module.exports = {
	getEvents
};
