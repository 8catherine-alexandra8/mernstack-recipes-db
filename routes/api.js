const express = require('express');
const router = express.Router();
const DBRecipe = require('../models/recipeModel')

router.get('/', (req, res) => {
    DBRecipe.find({})
        .then((data) => {
            console.log('Data: ', data)
            res.json(data);
        })
        .catch((err) => {
            console.log('Error', err)
        })
})

router.get('/:id', (req, res) => {
    DBRecipe.findOneAndDelete({id: req.params.id})
        .then((recipe) => {
            res.json(recipe);
        })
        .catch((err) => {
            console.log('Error', err)
        })
})

router.post('/save', (req, res) => { 
        const newDBRecipe = new DBRecipe({
        id: req.body.id,
        name: req.body.name,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        author: req.body.author
    });
    newDBRecipe.save()
    .then(() => res.json('Recipe added'))
    .catch(err => res.status(400).json(err));


});

module.exports = router;
