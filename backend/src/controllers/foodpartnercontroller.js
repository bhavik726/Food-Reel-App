const supabase = require('../db/supabase');

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;

        // Get food partner details
        const { data: foodPartner, error: partnerError } = await supabase
            .from('food_partners')
            .select('*')
            .eq('id', foodPartnerId)
            .single();

        if (partnerError || !foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        // Get all food items by this partner
        const { data: foodItems, error: foodsError } = await supabase
            .from('foods')
            .select('*')
            .eq('food_partner_id', foodPartnerId);

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner,
                foodItems: foodItems || []
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getFoodPartnerById
};