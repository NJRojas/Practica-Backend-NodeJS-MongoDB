const express = require('express');
const router = express.Router();

/* GET /change-locale */
router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;

  // Set a cookie in the response that holds the new locale
  res.cookie('nodeapp-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  // Reply with a redirection to the previous page
  res.redirect(req.get('referer'));
});

module.exports = router;
