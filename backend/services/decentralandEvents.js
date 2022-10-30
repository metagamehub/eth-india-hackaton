const axios = require("axios");

// we don't know yet how to get the full list of the attendees

async function getEvents() {
	axios({
		method: "get",
		url: "https://events.decentraland.org/api/events/",
	}).then(function (response) {
		for (const element of response.data.data) {
			console.log(">>> events id:", element.id);
			console.log("> name:", element.name);
			console.log("> creator:", element.user);
			console.log("> latest_attendees:", element.latest_attendees);
			console.log("> total_attendees:", element.total_attendees);
		}
	});
}
getEvents();
