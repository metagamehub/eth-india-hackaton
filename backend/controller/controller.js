const { Events, sequelize, Sequelize } = require("./../models");
const { Op } = require("sequelize");

module.exports = {
	create: async function (req, res) {
		try {
			const itemRequest = Events.checkPostParams(req.body);
			if (!itemRequest) return res.status(400).json({ msg: "incomplete parameters" });
			const item = Events.build(itemRequest);
			await item.save();
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	// search by event_id or walletAddress
	read: async function (req, res) {
		try {
			const { event_id, walletAddress } = req.query;
			let item;
			if (event_id) item = await Events.findOne({ where: { event_id: event_id } });
			else if (walletAddress)
				item = await Events.findOne({ where: { "metadata.walletAddress": walletAddress } });
			else return res.status(400).json({ msg: "invalid parameters" });
			if (!item) return res.status(400).json({ msg: "item not found" });
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	readAllWalletEvents: async function (req, res) {
		try {
			const { walletAddress } = req.query;
			const item = await Events.findAll({ where: { "metadata.walletAddress": walletAddress } });
			if (!item) return res.status(400).json({ msg: "item not found" });
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	readPurchases: async function (req, res) {
		try {
			const { walletAddress } = req.query;
			const item = await Events.findAll({
				where: {
					[Op.and]: [
						{ "metadata.walletAddress": walletAddress },
						{ "metadata.eventType": "purchase" },
					],
				},
			});
			if (!item) return res.status(400).json({ msg: "item not found" });
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	readVotes: async function (req, res) {
		try {
			const { walletAddress } = req.query;
			const item = await Events.findAll({
				where: {
					[Op.and]: [{ "metadata.walletAddress": walletAddress }, { "metadata.eventType": "vote" }],
				},
			});
			if (!item) return res.status(400).json({ msg: "item not found" });
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	readProposal: async function (req, res) {
		try {
			const { walletAddress } = req.query;
			const item = await Events.findAll({
				where: {
					[Op.and]: [
						{ "metadata.walletAddress": walletAddress },
						{ "metadata.eventType": "proposal" },
					],
				},
			});
			if (!item) return res.status(400).json({ msg: "item not found" });
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	readTop: async function (req, res) {
		try {
			const item = await sequelize.query(
				`SELECT metadata->>'walletAddress' , SUM(points_earned) FROM "Events" GROUP BY metadata ORDER BY SUM(points_earned) DESC LIMIT 5`
			);
			if (!item) return res.status(400).json({ msg: "item not found" });
			return res.status(200).json(item[0]);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	// update by event_id or walletAddress
	update: async function (req, res) {
		try {
			const { event_id, metadata, reclaimed } = req.body;
			let item;
			if (metadata)
				item = await Events.update({ metadata: metadata }, { where: { event_id: event_id } });
			if (reclaimed)
				item = await Events.update({ reclaimed: reclaimed }, { where: { event_id: event_id } });
			if (!item) return res.status(400).json({ msg: "invalid parameters" });
			return res.status(200).json(item);
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	// delete by event_id or walletAddress
	delete: async function (req, res) {
		try {
			const { event_id, walletAddress } = req.body;
			if (event_id) await Events.destroy({ where: { event_id: event_id } });
			else if (walletAddress)
				await Events.destroy({ where: { "metadata.walletAddress": walletAddress } });
			else return res.status(400).json({ msg: "invalid parameters" });
			return res.status(200).json({ msg: "item deleted" });
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	//internals
	createSelfFromIndexer: async function (request) {
		try {
			for (element of request) {
				const { walletAddress, eventType, event_id } = element;
				let points_earned;
				if (await Events.findOne({ where: { event_id: event_id } })) {
					// console.log(">> event with id:", event_id, "has already been inserted");
					return "already inserted";
				}
				if (eventType == "purchase") {
					points_earned = "10";
				}
				let body = {
					event_id: event_id,
					reclaimed: "false",
					points_earned: points_earned,
					metadata: {
						walletAddress: walletAddress,
						eventType: eventType,
					},
				};
				const itemRequest = Events.checkPostParams(body);
				if (!itemRequest) return "incomplete parameters";
				const item = Events.build(itemRequest);
				await item.save();
			}
			return "true";
		} catch (error) {
			console.error(error);
			return error.message;
		}
	},

	createSelfFromDAO: async function (request) {
		try {
			const { metadata, points_earned, event_id } = request;
			if (await Events.findOne({ where: { event_id: event_id } })) {
				// console.log(">> event with id:", event_id, "has already been inserted");
				return "already inserted";
			}
			let body = {
				event_id: event_id,
				reclaimed: "false",
				points_earned: points_earned,
				metadata: metadata,
			};
			const itemRequest = Events.checkPostParams(body);
			if (!itemRequest) return "incomplete parameters";
			const item = Events.build(itemRequest);
			await item.save();
			return "true";
		} catch (error) {
			console.error(error);
			return error.message;
		}
	},
};
