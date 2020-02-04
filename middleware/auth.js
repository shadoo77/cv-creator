const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   req.token = token;
//   //next();
//   if (!token) {
//     return res.status(401).send("Acces denied, no token provided!");
//   }
//   try {
//     req.token = jwt.verify(token, "SomeSecretKey");
//     next();
//   } catch (ex) {
//     res.status(400).send("Acces denied, invalid token provided!");
//   }
// };

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("from check:", process.env.JWT_KEY);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this resource!" });
  }
};
