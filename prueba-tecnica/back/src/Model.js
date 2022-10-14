const { Schema, model } = require("mongoose");

const schema = new Schema(
{
	link: {
		type: String,
		require: true
	},
	key: {
		type: String,
		require: true
	}
}
);

module.exports = model("Model", schema);