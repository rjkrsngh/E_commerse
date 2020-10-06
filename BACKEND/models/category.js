const mongoose = require('mongoose')

// Defining category schema here
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxlength: 32,
		unique: true
	}
},
{timestamps: true});

module.exports = mongoose.model('Category', categorySchema);