import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import Filter from './Filter';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

export const RecipeContext = React.createContext();

export default function App() {
    const [selectedRecipeId, setSelectedRecipeId] = useState();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredListDisplay, setFilteredListDisplay] = useState([]);
    const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
    

    useEffect(() => {
        axios.get('/api')
        .then(response => {
            setRecipes(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    const recipeContextValue = {
        handleRecipeAdd: handleRecipeAdd,
        handleRecipeDelete: handleRecipeDelete,
        handleRecipeSelect: handleRecipeSelect,
        handleRecipeChange: handleRecipeChange
    };

    function handleRecipeSelect(id) {
        setSelectedRecipeId(id)
        removeBlankRecipes();
    }

    function handleRecipeAdd() {
        const newRecipe = {
            _id: '',
            id: uuidv4(),
            name: '',
            servings: 1,
            prepTime: '',
            cookTime: '',
            instructions: '',
            ingredients: [
                {
                    id: uuidv4(),
                    name: '',
                    amount: ''
                }
            ],
            author: ''
        };
        let newRecipeId = newRecipe.id
        setSelectedRecipeId(newRecipeId)
    
        setRecipes([...recipes, newRecipe]);
    }   

    function handleRecipeChange(id, recipe) {
        const newRecipes = [...recipes]
        const index = newRecipes.findIndex(r => r.id === id)
        newRecipes[index] = recipe
        setRecipes(newRecipes)
    }

    function handleRecipeDelete(id) {
        if (selectedRecipeId !== null && selectedRecipeId === id) {
            setSelectedRecipeId(undefined)
        }
        axios.get('/api/' + id)
            .then(response => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }

    function handleSearchInput(event) {
        let unfilteredList = [...recipes]
        if (event !== "") {
            let filteredList = [];
            setSearchTerm(event);
            unfilteredList.forEach((recipe) => {
                let ingredientsArr = recipe.ingredients
                ingredientsArr.forEach((ingred) => {
                    if (ingred.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        filteredList.push(recipe)
                    }
                })
            });
            filteredList = filteredList.filter((value, index) => filteredList.indexOf(value) === index)
            setFilteredListDisplay(filteredList);
        } else {
            setFilteredListDisplay(recipes);
        };
    };
    function handleSearchClear() {
        let searchedTerm = searchTerm
        searchedTerm = '';
        setSearchTerm(searchedTerm)
    };

    function removeBlankRecipes() {
        const allRecipes = [...recipes]
        const noBlankRecipes = allRecipes.filter(recipe => recipe.name.length > 1)
        setRecipes(noBlankRecipes)
    }


    return (
        <RecipeContext.Provider value={recipeContextValue}>
             {selectedRecipe ? (
                <RecipeEdit recipe={selectedRecipe} />
            ) : (
            <>
            <Filter
                value={searchTerm}
                handleSearchInput={(event) => handleSearchInput(event.target.value)}
                handleSearchClear={handleSearchClear}
                handleRecipeAdd={handleRecipeAdd}
               
            />
           
                <RecipeList
                recipes={searchTerm.length < 1 ? recipes : filteredListDisplay}
                />
            </>
            )}
        </RecipeContext.Provider>
    );


}
