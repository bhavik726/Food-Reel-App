const foodPartnerController = require("../controllers/foodPartner.controller");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerController.getFoodPartnerById(
      decode.id,
    );

    if (!foodPartner) {
      return res.status(401).json({ message: "Food Partner not found" });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "pleasemlogin first" });
  }
  

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decode.id);   

    req.user = user;
    next()
  }
  catch{
    return res.status(401).json({ message: "Invalid Token" });
  }
}
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}
