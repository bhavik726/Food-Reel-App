const supabase = require('../db/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const { data: user, error } = await supabase
            .from('users')
            .insert([{ fullname, email, password: hashedPassword }])
            .select()
            .single();

        if (error) {
            return res.status(500).json({ message: "Error creating user", error: error.message });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully"
    }); 

}

async function registerFoodPartner(req, res) {
    try {
        const { name, email, password, phone, address, contactName } = req.body;

        // Check if food partner already exists
        const { data: existingPartner } = await supabase
            .from('food_partners')
            .select('*')
            .eq('email', email)
            .single();

        if (existingPartner) {
            return res.status(400).json({ message: "Food partner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new food partner
        const { data: foodPartner, error } = await supabase
            .from('food_partners')
            .insert([{
                name,
                email,
                password: hashedPassword,
                phone,
                address,
                contact_name: contactName
            }])
            .select()
            .single();

        if (error) {
            return res.status(500).json({ message: "Error creating food partner", error: error.message });
        }

        const token = jwt.sign({ id: foodPartner.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token);

        res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                id: foodPartner.id,
                name: foodPartner.name,
                email: foodPartner.email,
                phone: foodPartner.phone,
                address: foodPartner.address,
                contactName: foodPartner.contact_name
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}   

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;

        // Find food partner by email
        const { data: foodPartner, error } = await supabase
            .from('food_partners')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !foodPartner) {
            return res.status(400).json({ message: "Food partner not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, foodPartner.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: foodPartner.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token);

        res.status(200).json({
            message: "Food partner logged in successfully",
            foodPartner: {
                id: foodPartner.id,
                name: foodPartner.name,
                email: foodPartner.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
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


