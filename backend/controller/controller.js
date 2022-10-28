const { Events } = require("./../models");
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

	// update by event_id or walletAddress
	update: async function (req, res) {
		try {
			const { event_id, walletAddress } = req.body;
			if (event_id) await Events.update({ where: { event_id: event_id } });
			else if (walletAddress)
				await Events.update({ where: { "metadata.walletAddress": walletAddress } });
			else return res.status(400).json({ msg: "invalid parameters" });
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
};
