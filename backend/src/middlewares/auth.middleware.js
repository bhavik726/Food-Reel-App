const jwt = require("jsonwebtoken");
const supabase = require("../db/supabase");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const { data: foodPartner, error } = await supabase
      .from('food_partners')
      .select('*')
      .eq('id', decode.id)
      .single();

    if (error || !foodPartner) {
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
    return res.status(401).json({ message: "Please login first" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decode.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware
};
