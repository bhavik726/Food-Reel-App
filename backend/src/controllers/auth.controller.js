const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    const { fullname, email, password } = req.body;

    const isUserEzists = await userModel.findOne({ email });
    if (isUserEzists) {
        return res.status(400).json(
            { message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ fullname, email, password: hashedPassword })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json(
            { message: "Invalid credentials" });

    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json(
            { message: "Invalid credentials" });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token);
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully"
    }); 

}

async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;
    const isFoodPartnerExists = await FoodPartnerModel.findOne({ email });


    if (isFoodPartnerExists) {
        return res.status(400).json({ message: "Food partner already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    
    const foodPartner = await FoodPartnerModel.create({ name, email, password: hashedPassword });

    res.token = jwt.sign({id: foodPartner._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token);
    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
        }
    })
}   

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await FoodPartnerModel.findOne({ email });
    if (!foodPartner) {
        return res.status(400).json({ message: "Food partner not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({id: foodPartner._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token);
    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    })
}   

module.exports = { registerUser,
     loginUser, logoutUser
      , registerFoodPartner,
       loginFoodPartner, 
       logoutFoodPartner};


