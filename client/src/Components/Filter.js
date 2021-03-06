import React, { useContext } from 'react'
import { RecipeContext } from './App'

export default function Filter({
	searchTerm,
	handleSearchInput,
	handleSearchClear
}) {
	const { handleRecipeAdd } = useContext(RecipeContext)

	return (
		<div className='filter__details-grid'>
			<div className='filter'>
				<label className='filter__label' htmlFor='search'>
					Recipe Search
				</label>
				<input
					className='filter__input'
					type='text'
					name='search'
					value={searchTerm}
					onChange={handleSearchInput}
					placeholder='by ingredient'
				/>
				<div className='filter__clear-search-btn-container'>
					<button
						className='btn btn--attention clear'
						onClick={handleSearchClear}
					>
						Clear
					</button>
				</div>
			</div>
			<div
				className='filter__add-recipe-btn-container'
				onClick={handleRecipeAdd}
			>
				<button onClick={handleRecipeAdd} className='btn btn--attention'>
					Add Recipe
				</button>
			</div>
		</div>
	)
}
