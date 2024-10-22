const mongoose = require('mongoose');

// Define the schema for users
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uploadImg: {
        type: String,
        required: true
    }

}, { timestamps: true }); // Automatically manages createdAt and updatedAt

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model so it can be used elsewhere
module.exports = User;
