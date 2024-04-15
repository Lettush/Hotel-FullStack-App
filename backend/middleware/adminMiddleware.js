const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminMiddleware = async (req, res, next) => {
  try {
    const admin = await User.findById({ _id: req.user });
    if (!admin.admin) throw new Error();
    next();
  } catch (error) {
    res.status(401).json({ error: "Only admins have access to this feature!" });
  }
};

module.exports = adminMiddleware;
