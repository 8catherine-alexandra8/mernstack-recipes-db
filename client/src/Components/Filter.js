import React, { useContext } from 'react';
import { RecipeContext } from './App';


export default function Filter({
    value,
	handleSearchInput,
	handleSearchClear
}) {
    const { handleRecipeAdd } = useContext(RecipeContext);

	return (
		<div className="filter__details-grid">
			<div className="filter">
				<label className="filter__label" htmlFor="search">
					Recipe Search
				</label>
				<input
					className="filter__input"
					type="text"
					value={value}
					onChange={handleSearchInput}
					placeholder="includes ingredient"
				/>
				<div className="filter__clear-search-btn-container">
					<button
						className="btn btn--attention"
						onClick={handleSearchClear}
					>
						Clear
					</button>
				</div>
			</div>
			<div className="filter__add-recipe-btn-container">
				<button
                    onClick={handleRecipeAdd}
					className="btn btn--attention"
				>
					Add Recipe
				</button>
			</div>
		</div>
	);
}
