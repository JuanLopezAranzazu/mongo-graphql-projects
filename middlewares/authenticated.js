const jwt = require("jsonwebtoken");
const { config } = require("./../config");

const createJwt = async (dataForToken) => {
  const token = await jwt.sign(dataForToken, config.jwtSecret, {
    expiresIn: "1h",
  });
  return token;
};

const authenticated = async (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = await jwt.verify(token, config.jwtSecret);
      console.log("USER", user);
      req.user = user;
      next();
    } catch (error) {
      throw new Error("Jwt incorrect");
    }
  }
  next();
};

module.exports = { authenticated, createJwt };
