const express = require('express');
const router = express.Router();
const Ads = require('../../models/Ads');

// GET /api/ads
// returns a list of existings ads
router.get('/', async(req, res, next) => {

    try {

        // Filters tag, type, price range, article

        // pagination

        // ** sorting

        const ads = await Ads.find();
        res.json({results: ads})
    
    } catch (error) {
        next(error);
    }
});

// POST /api/ads (object in the body)
// Create ads
router.post('/', async(req, res, next) => {

    try {
        // Retrieve data from body
        const adsData = req.body;

        // Create instance(s)
        const newAds = new Ads(adsData);

        // persist in DB
        const storedAds = await newAds.save();

        res.json({results: storedAds})
    
    } catch (error) {
        next(error);
    }
});

module.exports = router;