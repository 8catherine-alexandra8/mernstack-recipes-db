import React, { useContext, useEffect } from 'react'
import RecipeIgredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import close from '../img/close.png'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default function RecipeEdit({ recipe }) {
	const { handleRecipeChange, handleRecipeSelect } = useContext(
		RecipeContext
	)
	// const [ originalRecipe, setOriginalRecipe ] = useState({ recipe })
	// const [ editedRecipe, setEditedRecipe ] = useState({})

	useEffect(
		() => {
			if (recipe) {
				console.log('recipe prop:', recipe)
				// console.log('originalRecipe', originalRecipe)
			}
		},
		[ recipe ]
	)
	function handleChange(changes) {
		handleRecipeChange(recipe.id, { ...recipe, ...changes })
	}
	function handleIngredientChange(id, ingredient) {
		const newIngredients = [ ...recipe.ingredients ]
		const index = newIngredients.findIndex((i) => i.id === id)
		newIngredients[index] = ingredient
		handleChange({ ingredients: newIngredients })
	}
	function handleIngredientAdd() {
		const newIngredient = {
			id     : uuidv4(),
			name   : '',
			amount : ''
		}
		handleChange({ ingredients: [ ...recipe.ingredients, newIngredient ] })
	}

	function handleIngredientDelete(id) {
		handleChange({
			ingredients : recipe.ingredients.filter((i) => i.id !== id)
		})
	}
	function handleRecipeSubmit(event) {
		event.preventDefault()

		axios
			.patch(`/api/edit/${recipe._id}`, recipe)
			.then((res) => console.log(res.data))
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data)
				} else if (error.request) {
					console.log(error.request)
				} else {
					console.log('Error', error.message)
				}
			})

		handleRecipeSelect(undefined)
	}

	return (
		<div className='recipe-edit'>
			<div className='recipe-edit__exit-button-container'>
				<button
					className='btn recipe-edit__exit-button'
					onClick={() => handleRecipeSelect(undefined)}
				>
					<img src={close} height='20px' alt='exit button' />
				</button>
			</div>
			<form
				className='edit-form'
				onSubmit={(event) => handleRecipeSubmit(event)}
			>
				<div className='recipe-edit__details-grid'>
					<label className='recipe-edit__label' htmlFor='name'>
						Recipe Name
					</label>
					<input
						className='recipe-edit__input'
						type='text'
						name='name'
						id='name'
						value={recipe.name}
						onChange={(event) =>
							handleChange({ name: event.target.value })}
						required
					/>
					<label className='recipe-edit__label' htmlFor='prepTime'>
						Prep time
					</label>
					<input
						className='recipe-edit__input'
						type='text'
						name='prepTime'
						id='prepTime'
						value={recipe.prepTime}
						placeholder='0:00'
						onChange={(event) =>
							handleChange({ prepTime: event.target.value })}
					/>
					<label className='recipe-edit__label' htmlFor='cookTime'>
						Cook time
					</label>
					<input
						className='recipe-edit__input'
						type='text'
						name='cookTime'
						id='cookTime'
						value={recipe.cookTime}
						placeholder='0:00'
						onChange={(event) =>
							handleChange({ cookTime: event.target.value })}
						required
					/>
					<label className='recipe-edit__label' htmlFor='servings'>
						Servings
					</label>
					<input
						className='recipe-edit__input'
						type='number'
						min='1'
						name='servings'
						id='servings'
						value={recipe.servings}
						onChange={(event) =>
							handleChange({
								servings : parseInt(event.target.value) || ''
							})}
						required
					/>
					<label className='recipe-edit__label' htmlFor='instructions'>
						Instructions
					</label>
					<textarea
						className='recipe-edit__input'
						type='textarea'
						name='instructions'
						id='instructions'
						onChange={(event) =>
							handleChange({ instructions: event.target.value })}
						value={recipe.instructions}
						required
					/>
				</div>
				<br />
				<label className='recipe-edit__label'>Ingredients</label>
				<div className='recipe-edit__ingredient-grid'>
					<div>Name & Amount</div>
					{/* <div>Amount</div> */}
					{/* <div /> */}
					{recipe.ingredients.map((ingredient) => (
						<RecipeIgredientEdit
							key={ingredient.id}
							handleIngredientChange={handleIngredientChange}
							ingredient={ingredient}
							handleIngredientDelete={handleIngredientDelete}
						/>
					))}
				</div>
				<div className='recipe-edit__add-ingredient-btn-container'>
					<button
						type='button'
						className='btn btn--primary'
						onClick={() => handleIngredientAdd()}
					>
						Add Ingredient
					</button>
				</div>
				<label className='recipe-edit__label author' htmlFor='author'>
					Author
				</label>
				<input
					className='recipe-edit__input'
					type='text'
					name='author'
					id='author'
					value={recipe.author}
					onChange={(event) =>
						handleChange({ author: event.target.value })}
					required
				/>
				<div className='recipe-edit__submit-recipe-btn-container'>
					<button className='btn btn--attention'>Submit Recipe</button>
				</div>
			</form>
		</div>
	)
}
