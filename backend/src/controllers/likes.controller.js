const supabase = require("../db/supabase");

async function addLike(req, res) {
  try {
    const { foodId } = req.params;
    const userId = req.user.id;

    // Check if like already exists
    const { data: existingLike } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", userId)
      .eq("food_id", foodId)
      .single();

    if (existingLike) {
      return res.status(400).json({ message: "Already liked" });
    }

    // Add like
    const { data: insertedLike, error } = await supabase
      .from("likes")
      .insert([{ user_id: userId, food_id: foodId }])
      .select();

    if (error) {
      return res.status(500).json({ message: "Error adding like", error: error.message, details: error });
    }

    // Get updated like count
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("food_id", foodId);

    res.status(201).json({ message: "Like added", likeCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function removeLike(req, res) {
  try {
    const { foodId } = req.params;
    const userId = req.user.id;

    // Remove like
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", userId)
      .eq("food_id", foodId);

    if (error) {
      return res.status(500).json({ message: "Error removing like", error: error.message });
    }

    // Get updated like count
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("food_id", foodId);

    res.status(200).json({ message: "Like removed", likeCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getUserLikes(req, res) {
  try {
    const userId = req.user.id;

    const { data: likes, error } = await supabase
      .from("likes")
      .select("food_id")
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ message: "Error fetching likes", error: error.message });
    }

    const likedFoodIds = likes.map((l) => l.food_id);
    res.status(200).json({ likedFoodIds });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  addLike,
  removeLike,
  getUserLikes,
};
