const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,

    },
    phone_number: {
        type: Number,
        // required:true,

    },
    message: String,
    supported: {
        type: Boolean,
        default: false,
    },
    supportedByWhom: String,

}, { timestamps: true })
const mailModel = mongoose.model('codeFusionMails', schema);
module.exports = mailModel;