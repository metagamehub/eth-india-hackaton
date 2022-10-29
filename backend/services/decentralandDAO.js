const axios = require("axios");
const databaseController = require("../controller/controller");

let proposals = [];

async function getProposals() {
	axios({
		url: "https://hub.snapshot.org/graphql",
		method: "get",
		data: {
			query: `
                query Proposals {
                    proposals (
                    first: 1000,
                    skip: 0,
                    where: {
                        space_in: ["snapshot.dcl.eth"],
                        state: "active"
                    },
                    orderBy: "created",
                    orderDirection: desc
                    ) {
                    id
                    title
                    author
                    }
                }
            `,
		},
	}).then(async (result) => {
		proposals = result.data.data.proposals;
		await getVoters();
	});
}

async function getVoters() {
	for (let proposal of proposals) {
		let body = {
			event_id: "proposal" + "-" + proposal.id + "-",
			points_earned: "5",
			metadata: {
				walletAddress: proposal.author,
				eventType: "proposal",
			},
		};
		await databaseController.createSelfFromDAO(body);
		axios({
			url: "https://hub.snapshot.org/graphql",
			method: "get",
			data: {
				query: `
                    query Votes {
                            votes(first: 1000, skip: 0, where: {proposal: "${proposal.id}"}, orderBy: "created", orderDirection: desc) {
                                voter
                            }
                        }
                    `,
			},
		}).then(async (result) => {
			for (element of result.data.data.votes) {
				let body = {
					event_id: "vote" + "-" + element.voter + "-" + proposal.id,
					points_earned: "20",
					metadata: {
						walletAddress: element.voter,
						eventType: "vote",
					},
				};
				await databaseController.createSelfFromDAO(body);
			}
		});
	}
}

module.exports = {
	getProposals,
};

getProposals();
