"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Events extends Model {
		static checkPostParams(body) {
			const param_list = ["event_id", "metadata", "points_earned", "reclaimed"];

			let new_body = {};

			for (let param of param_list) {
				if (!body[param]) return false;
				new_body[param] = body[param];
			}

			new_body["createdAt"] = new Date()
				.toISOString()
				.replace(/T/g, " ")
				.replace(/Z/g, "")
				.replace(/z/g, "");

			return new_body;
		}
	}
	Events.init(
		{
			event_id: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			metadata: {
				type: DataTypes.JSONB,
				allowNull: false,
			},
			points_earned: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			reclaimed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Events",
			modelName: "Events",
		}
	);
	return Events;
};
