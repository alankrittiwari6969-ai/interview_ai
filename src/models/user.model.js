const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true,"already taken baby"],
        require:true,

    },
    email:{
        type: String,
        unique:[true,"already ragister"],
        require:true,
    },
    passward:{
        type:String,
        require:true,

    },

})
const userModel = mongoose.Model("users",UserSchema)
module.exports = userModel

