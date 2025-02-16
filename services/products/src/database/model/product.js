const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String },
    banner: { type: String },
    type: { type: String },
    unit: { type: String },
    price: { type: Number},
    available: { type: Boolean, default: true },
    suplier: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'category' }
});

module.exports = mongoose.model('product', ProductSchema);
