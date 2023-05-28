const express = require('express');
const router = express.Router();
const Ads = require('../../models/Ads');
const upload = require('../../lib/imageUploadConfig');
const thumbnail = require('../../lib/thumbnailConfig');

/**
 * Include filters
 * - by article - /apiv1/ads/?name=personal%20wings
 * - by price range
 * - by type, to sell or looking for - /apiv1/ads/?onSell=true
 * - by tags - /apiv1/ads/?tags=work
 * - It sorts the list /apiv1/ads/?sort=price
 * - even mixed
 */

/**
 * @openapi
 * /apiv1/ads:
 *  get:
 *   description: returns a list of existings ads. It is protected, authentication is required to be accessed
 *   parameters:
 *      - in: query
 *        name: article
 *        schema:
 *          type: String
 *        description: The name of the article
 *      - in: query
 *        name: onSell
 *        schema:
 *          type: boolean
 *        description: Whether the article is on Sell or someone is looking for
 *      - in: query
 *        name: tags
 *        schema:
 *           type: string
 *        description: a category for the requested article list
 *      - in: query
 *        name: price
 *        schema:
 *           type: float
 *        description: a price range to select articles with price in that range
 *      - in: query
 *        name: sort
 *        schema:
 *           type: String
 *        description: a parameter name to be sorted by
 *   responses:
 *    200:
 *     description: Returns a JSON
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
 * @openapi
 * /api/tags:
 *  get:
 *   description: returns a json with the list of active tags
 *   responses:
 *    200:
 *     description: Returns a JSON
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
 * @openapi
 * /apiv1/ads:
 *   post:
 *     summary: creates a new article.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: ad
 *         description: The ad to create.
 *         schema:
 *           type: object
 *           required:
 *             - article
 *           properties:
 *             article:
 *               type: string
 *             onSell:
 *               type: boolean
 *             price:
 *               type: string
 *             image_Url:
 *               type: boolean
 *             tags:
 *               type: array
 *     responses:
 *       200:
 *         description: Returns a JSON
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
