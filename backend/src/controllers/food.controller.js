const supabase = require("../db/supabase");
const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );

    const insertData = {
      name: req.body.title,
      video: fileUploadResult,
      food_partner_id: req.foodPartner.id,
    };

    // Only add description if it exists and the column exists in your table
    if (req.body.description) {
      insertData.description = req.body.description;
    }

    const { data: foodItem, error } = await supabase
      .from('foods')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: "Error creating food item", error: error.message });
    }
    res.status(201).json({ message: "Food item created successfully", food: foodItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getFoods(req, res) {
  try {
    const { data: fooditems, error } = await supabase
      .from('foods')
      .select('*, food_partners(*)');

    if (error) {
      return res.status(500).json({ message: "Error retrieving food items", error: error.message });
    }

    res.status(200).json({ message: "Food items retrieved successfully", fooditems });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createFood,
  getFoods,
};
