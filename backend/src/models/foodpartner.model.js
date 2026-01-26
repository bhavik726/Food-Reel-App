const mongoose = require('mongoose');

const foodpartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const FoodPartnerModel = mongoose.model('FoodPartner', foodpartnerSchema);
module.exports = FoodPartnerModel;