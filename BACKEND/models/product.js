const mongoose = require('mongoose')

// Pull out an object of mongoose schema
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		maxlength: 32
	},
	description: {
		type: String,
		trim: true,
		required: true,
		maxlength: 2000
	},
	price: {
		type: Number,
		required: true,
		maxlength: 32,
		trim: true
	},

	// Links this product with its category schema
	category: {
		type: ObjectId,
		ref: "Category",
		required: true
	},
	// Number of items of the product in stock
	stock: {
		type: Number,
	},
	// Number of units sold
	sold: {
		type: Number,
		default: 0
	},
	// image of the product to be displayed
	photo: {
		data: Buffer,
		contentType: String
	},
	size: {
		type: String,
		//required: true
	}
},
{timestamps: true});


module.exports = mongoose.model("Product", productSchema);