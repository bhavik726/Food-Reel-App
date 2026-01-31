const supabase = require("../db/supabase");

async function addSave(req, res) {
  try {
    const { foodId } = req.params;
    const userId = req.user.id;

    // Check if already saved
    const { data: existingSave } = await supabase
      .from("saves")
      .select("*")
      .eq("user_id", userId)
      .eq("food_id", foodId)
      .single();

    if (existingSave) {
      return res.status(400).json({ message: "Already saved" });
    }

    // Add save
    const { data: insertedSave, error } = await supabase
      .from("saves")
      .insert([{ user_id: userId, food_id: foodId }])
      .select();

    if (error) {
      return res.status(500).json({ message: "Error saving food", error: error.message, details: error });
    }

    // Get updated save count
    const { count } = await supabase
      .from("saves")
      .select("*", { count: "exact", head: true })
      .eq("food_id", foodId);

    res.status(201).json({ message: "Food saved", saveCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function removeSave(req, res) {
  try {
    const { foodId } = req.params;
    const userId = req.user.id;

    // Remove save
    const { error } = await supabase
      .from("saves")
      .delete()
      .eq("user_id", userId)
      .eq("food_id", foodId);

    if (error) {
      return res.status(500).json({ message: "Error removing save", error: error.message });
    }

    // Get updated save count
    const { count } = await supabase
      .from("saves")
      .select("*", { count: "exact", head: true })
      .eq("food_id", foodId);

    res.status(200).json({ message: "Save removed", saveCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getUserSaves(req, res) {
  try {
    const userId = req.user.id;

    const { data: saves, error: savesError } = await supabase
      .from("saves")
      .select("food_id")
      .eq("user_id", userId);

    if (savesError) {
      return res.status(500).json({ message: "Error fetching saves", error: savesError.message });
    }

    // If no saves, return empty array
    if (!saves || saves.length === 0) {
      return res.status(200).json({ savedFoods: [] });
    }

    const savedFoodIds = saves.map((s) => s.food_id);

    // Get full food details for saved items
    const { data: foodItems, error: foodError } = await supabase
      .from("foods")
      .select("*, food_partners(*)")
      .in("id", savedFoodIds);

    if (foodError) {
      return res.status(500).json({ message: "Error fetching saved foods", error: foodError.message });
    }
    res.status(200).json({ savedFoods: foodItems || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  addSave,
  removeSave,
  getUserSaves,
};
