const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

// This schema is for each product in the cart
const ProductCartSchema = new mongoose.Schema({
	product: {
		type: ObjectId,
		ref: "product"
	},
	name: String,
	count: Number,
	price: Number,
	size: String,
	DateOfOrder: Date,
	ExpectedDeliveryDate: Date
},
{timestamps: true});

const ProductCart = mongoose.model("productcart", ProductCartSchema);


// This is the entire order 
const orderSchema = new mongoose.Schema({
	// TODO: Keep visiting here 
	products: [ProductCartSchema],
	transaction_id: {},
	amount: {
		type: Number
	},
	address: {
		type: String
	},
	updated: Date,
	user: {
		type: ObjectId,
		ref: "user"
	}
}, 
{timestamps: true});

const order = mongoose.model("order", orderSchema);

module.exports = {ProductCart, order};