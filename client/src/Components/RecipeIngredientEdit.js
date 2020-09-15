import React from 'react';

export default function RecipeIngredientEdit(props) {
    const {
        ingredient,
        handleIngredientChange,
        handleIngredientDelete
    } = props

    function handleChange(changes) {
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
    }
    return (
        <>
            <input
                className="recipe-edit__input"
                type="text"
                value={ingredient.name}
                placeholder="ingredient"
                onChange={(event) => handleChange({ name: event.target.value })}
                required
            />
            <input
                className="recipe-edit__input"
                type="text"
                value={ingredient.amount}
                placeholder="amount"
                onChange={(event) => handleChange({ amount: event.target.value })}
                required
            />

            <button
                className="btn btn--danger"
                onClick={() => handleIngredientDelete(ingredient.id)}
            >
                &times;
			</button>
        </>
    );
}
