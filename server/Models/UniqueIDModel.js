const mongoose = require('mongoose');

// Define the schema for the generated IDs
const uniqueIdSchema = new mongoose.Schema({
    generated_id: { type: String, required: true, unique: true }
});

// Create a Mongoose model
const UniqueIdModel = mongoose.model('UniqueId', uniqueIdSchema);

module.exports = UniqueIdModel;
