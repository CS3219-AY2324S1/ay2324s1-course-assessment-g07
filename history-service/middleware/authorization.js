const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');
    console.log('AUTHORIZATION');
    console.log(jwtToken);
    console.log('above is jwt token');

    if (!jwtToken) {
      return res.status(403).json({ message: 'Not Authorized' });
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log(payload);

    req.user = payload.user;
    // console.log('authorization done bois');
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json({ message: err.message });
  }
};