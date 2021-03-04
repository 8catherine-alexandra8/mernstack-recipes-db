const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const DBRecipe = require('../models/recipeModel')

router.get('/', (req, res) => {
	DBRecipe.find({})
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			console.log('Error', err)
		})
})

router.get('/:id', (req, res) => {
	DBRecipe.findOneAndDelete({ id: req.params.id })
		.then((recipe) => {
			res.json(recipe)
		})
		.catch((err) => {
			console.log('Error', err)
		})
})

router.post('/save', (req, res) => {
	const newDBRecipe = new DBRecipe({
		id           : req.body.id,
		name         : req.body.name,
		prepTime     : req.body.prepTime,
		cookTime     : req.body.cookTime,
		servings     : req.body.servings,
		instructions : req.body.instructions,
		ingredients  : req.body.ingredients,
		author       : req.body.author
	})
	newDBRecipe
		.save()
		.then(() => res.json('Recipe added'))
		.catch((err) => res.status(400).json(err))
})

router.patch(
	'/edit/:id',
	asyncHandler(async (req, res) => {
		const recipe = await DBRecipe.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true, context: 'query' }
		)
		if (recipe) {
			;(recipe.name = req.body.name),
				(recipe.prepTime = req.body.prepTime),
				(recipe.cookTime = req.body.cookTime),
				(recipe.servings = req.body.servings),
				(recipe.instructions = req.body.instructions),
				(recipe.ingredients = req.body.ingredients),
				(recipe.author = req.body.author)

			const editedRecipe = await recipe.save()
			res.json(editedRecipe)
		} else {
			res.status(404)
			throw new Error('Post not found')
		}
	})
)

module.exports = router
