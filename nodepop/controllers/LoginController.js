const { User } = require('../models');
const jwt = require('jsonwebtoken');

class LoginController {
  /**
   *  API /login
   */
  async postAPI(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user in the DB
      const user = await User.findOne({ email: email });

      // In case no user found throws error
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: 'invalid credentials' });
        return;
      }

      // If user and password were found
      // create a JWT token for that user
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });

      res.json({ jwt: token });
    } catch (err) {
      next(err);
    }
  }
}

// Export module
module.exports = LoginController;
