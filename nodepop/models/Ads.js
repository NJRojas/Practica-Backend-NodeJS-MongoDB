const mongoose = require('mongoose');

// Define Ads schema
const adsSchema = mongoose.Schema({
    article: String,
    onSell: Boolean,
    price: Number,
    imageUrl: String,
    tags: [String]
});

// Create Ads collection based on adsSchema
const Ads = mongoose.model('Ads', adsSchema);

// Exportar el modelo
module.exports = Ads;