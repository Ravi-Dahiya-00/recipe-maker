        
const apiKey = '8e6b425de77e499fa3555c771d1c2f85';

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    const cuisine = document.getElementById('cuisine').value;
    const diet = document.getElementById('diet').value;

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredients}&cuisine=${cuisine}&diet=${diet}&addRecipeInformation=true`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="getRecipeDetails(${recipe.id})">
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
        </div>
    `).join('');
}
async function getRecipeDetails(recipeId) {
    const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(detailsUrl);
        const recipe = await response.json();
        displayRecipeDetails(recipe);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.instructions}</p>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
    `;
}
async function getRecipeDetails(recipeId) {
    const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    window.open(detailsUrl, '_blank');
}
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    if (recipes.length === 0) {
        recipeContainer.innerHTML = `<p class="no-results">No recipes found. Try adjusting your search criteria.</p>`;
    } else {
        recipeContainer.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" onclick="getRecipeDetails(${recipe.id})">
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
        `).join('');
    }
}
function getRecipeDetails(recipeId) {
    window.location.href = `recipe-details.html?id=${recipeId}`;
}

