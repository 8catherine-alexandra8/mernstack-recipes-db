const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DBRecipeSchema = new Schema({
    id: String,
    name: String,
    servings: Number,
    prepTime: String,
    cookTime: String,
    instructions: String,
    ingredients: [{ id: String, name: String, amount: String }],
    author: String
})
const DBRecipe = mongoose.model('DBRecipe', DBRecipeSchema);

module.exports = DBRecipe;