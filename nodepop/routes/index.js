var express = require('express');
var router = express.Router();

// Load data model
const Ads = require('../models/Ads');

/**
 * GET home page.
 * Returns a list of existing ads
 *
 * * Include filters
 * - by article - /apiv1/ads/?article=personal%20wings
 * - by price range
 * - by type, to sell or looking for - /apiv1/ads/?onSell=true
 * - by tags - /apiv1/ads/?tags=work
 * - It sorts the list /apiv1/ads/?sort=price
 * - even mixed
 */
router.get('/', async function(req, res, next) {

  try {
    const query = req.query;
    const ads = await Ads.listFor(query);
    res.locals.ads = ads;
    res.render('index');

    } catch(error) {
      next(error);
    }
});

/**
 * GET /tags
 * Returns a list of available tags
 */
router.get('/tags', async(req, res, next) => {

  const tags = await Ads.activeTags();
  res.locals.tags = tags;
  res.render('tags');

})

module.exports = router;
