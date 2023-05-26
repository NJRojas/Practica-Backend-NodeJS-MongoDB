const express = require('express');
const router = express.Router();
const Ads = require('../../models/Ads');
const upload = require('../../lib/imageUploadConfig');
const thumbnail = require('../../lib/thumbnailConfig');

/**
 * GET /apiv1/ads
 * returns a list of existings ads
 *
 * Include filters
 * - by article - /apiv1/ads/?name=personal%20wings
 * - by price range
 * - by type, to sell or looking for - /apiv1/ads/?onSell=true
 * - by tags - /apiv1/ads/?tags=work
 * - It sorts the list /apiv1/ads/?sort=price
 * - even mixed
 */
router.get('/', async (req, res, next) => {
  try {
    const query = req.query;
    const ads = await Ads.listFor(query);
    res.json({ results: ads });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tags
 * returns a json with the list of active tags
 */
router.get('/tags', async (req, res, next) => {
  try {
    const tags = await Ads.activeTags();
    res.json({ tags: tags });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/ads (object in the body)
 * Create ads
 */
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    // Retrieve data from body
    const adsData = req.body;
    adsData.image_url = req.file.filename;

    // Create instance(s)
    const newAds = new Ads(adsData);

    // Persist in Ads collection
    const storedAds = await newAds.save();

    // call Microservice to create thumbnail
    await thumbnail(adsData.image_url, 100);

    res.json({ results: storedAds });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
