const mongoose = require("mongoose")



const blacklistTokenSchema = new mongoose.Schema({
    Token: {
        type: String,
        required: [true, "require to blacklist "],
    },
}, {
    timestamps: true,
})

const TokenBlacklistModel = mongoose.model("blacklistToken", blacklistTokenSchema)
module.exports = TokenBlacklistModel
