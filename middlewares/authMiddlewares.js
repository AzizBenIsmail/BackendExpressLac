const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = async (req, res, next) => {
  //const token = req.headers.authorization?.split(" ")[1]; //frontend
  const token = req.cookies.jwt;
  if (token) {
    //
    jwt.verify(token, "net secret 9antra", async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      const user = await userModel.findById(decodedToken.id);
      if (user) {
        if (user.Ban == false) {
          if (user.Status == true) {
            req.user = user;
            next();
          }
          res.status(403).json({ message: "Your account is not activated" });
        }
        res.status(403).json({ message: "Your account is banned" });
      } else {
        res.status(401).json({ message: "Unauthorized: User not found" });
      }
    });
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};
