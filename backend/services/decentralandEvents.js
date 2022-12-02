const axios = require("axios");
const https = require("https");

async function getEvents() {
	axios({
		method: "get",
		httpsAgent: new https.Agent({ keepAlive: true }),
		timeout: 60000,
		url: "https://events.decentraland.org/api/events/",
	}).then(async function (response) {
		for (const element of response.data.data) {
			// console.log(">> information of event", element);
			console.log(">>> event:", element.name);
			console.log(">>> events id:", element.id);
			console.log(">>> events start_at:", element.start_at);
			console.log(">>> events finish_at:", element.finish_at);
			console.log(">>> events coordinates:", element.coordinates);
			// console.log("> name:", element.name);
			// console.log("> creator:", element.user);
			// console.log("> latest_attendees:", element.latest_attendees);
			// console.log("> total_attendees:", element.total_attendees);
			console.log("---------------------------------------------------------------");
			// await getAttendes(element.id,element.start_at,element.finish_at,element.coordinates);
		}
		await getAttendes(
			response.data.data[0].name,
			response.data.data[0].id,
			response.data.data[0].start_at,
			response.data.data[0].finish_at,
			response.data.data[0].coordinates
		);
	});
}

async function getAttendes(
	event_name,
	event_id,
	event_start_at,
	event_finish_at,
	event_coordinates
) {
	const startDate = new Date(event_start_at);
	const startTimestampSeconds = Math.floor(startDate.getTime() / 1000);
	const finishDate = new Date(event_finish_at);
	const finishTimestampSeconds = Math.floor(finishDate.getTime() / 1000);
	const stepTimestampSeconds = startTimestampSeconds + 3600;

	console.log(">>> event:", event_name);
	console.log(">>> event id:", event_id);
	console.log(">>> start date:", startTimestampSeconds);
	console.log(">>> finish date:", finishTimestampSeconds);
	console.log(">>> X:", event_coordinates[0]);
	console.log(">>> Y:", event_coordinates[1]);

	let index = 0;
	let attendees = [];

	for (let start = startTimestampSeconds; start < finishTimestampSeconds; start += 7200) {
		const from = start
		const to = start+7200
		axios({
			method: "get",
			httpsAgent: new https.Agent({ keepAlive: true }),
			timeout: 60000,
			url: `https://dao-data.atlascorp.io/user-history/${from}/${to}/${event_coordinates[0]}/${event_coordinates[1]}`,
		})
			.then(function (response) {
				console.log(">>> from:", from);
				console.log(">>> to:", to);
				// console.log(">>> event attendees:", response.data);
				for (const element of response.data) {
					console.log(">>> time:", element._id);
					console.log(">>> event attendees:", element['unique-users']);
				}
			})
			.catch((error) => {
				console.log(">> axios error:", error.code);
			});
		index ++;
		if (index % 9 == 0){
			//break
			//wait another minute
			await new Promise(resolve => setTimeout(resolve, 60000));
		}
	}
}

getEvents();
