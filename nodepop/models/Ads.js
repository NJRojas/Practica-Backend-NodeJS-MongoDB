const mongoose = require('mongoose');

// Define Ads schema
const adsSchema = mongoose.Schema({
    article: String,
    onsell: Boolean,
    price: Number,
    description: String,
    image_url: String,
    tags: {
        type: [String],
        enum : ['work', 'lifestyle', 'motor', 'mobile']
    }
});

/**
 * Ads.listFor
 * 
 * @param {String} req The request string 
 * @returns a list of found Ads after filter 
 */
adsSchema.statics.listFor = function(queryParameters) {

    const filterByArticle = queryParameters.name;
    const filterByType = queryParameters.onsell;
    const filterByTags = queryParameters.tag;
    const filterByPrice = queryParameters.price;
    const filteByMinPrice = queryParameters.minPrice;
    const filterByMaxPrice = queryParameters.maxPrice;

    const filter = {};

    if (filterByArticle) {
        filter.article = { "$regex": filterByArticle, "$options": "i"};
    }

    if (filterByType) {
        filter.onsell = filterByType;
    }

    if (filterByTags) {
        filter.tags = filterByTags;
    }

    if (filterByPrice) {
        filter.price = filterByPrice;

    } else if (filteByMinPrice && filterByMaxPrice) {
        filter.price = {
            $lte: filterByMaxPrice,
            $gte: filteByMinPrice
        }

    } else if (filteByMinPrice) {
        filter.price = { $gte: filteByMinPrice };

    } else if (filterByMaxPrice) {
        filter.price = { $lte: filterByMaxPrice };
    }

    console.log('filters: ', filter);
    const query = Ads.find(filter);

    // pagination
    const skip = queryParameters.skip;
    query.skip(skip);
    const limit = queryParameters.limit;
    query.limit(limit);

    // sorting
    const sort = queryParameters.sort;
    query.sort(sort);

    // Select by given
    const fields = queryParameters.fields;
    query.select(fields);

    return query.exec();
}

/**
 * Ads.activeTags()
 * @returns The list of available tags
 */
adsSchema.statics.activeTags = function() {
    const query = Ads.find();
    query.select('tags').distinct('tags');
    return query.exec();
}

// Create Ads collection based on adsSchema
const Ads = mongoose.model('Ads', adsSchema);

// Exportar el modelo
module.exports = Ads;