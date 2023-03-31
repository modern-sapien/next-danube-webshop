// @desc logs request to console

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocal}://${req.originalUrl}`)
  next();
};

// module.exports = logger