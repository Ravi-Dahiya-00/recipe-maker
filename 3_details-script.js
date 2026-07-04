// chage your api key 
const apiKey = 'get your api key from spoonacular';

async function fetchRecipeDetails() {

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const recipe = await response.json();
        
        // Populate the page with recipe details
        document.getElementById('recipe-title').textContent = recipe.title;
        document.getElementById('recipe-image').src = recipe.image;
        document.getElementById('recipe-summary').innerHTML = recipe.summary;
        
        const ingredientsList = document.getElementById('recipe-ingredients');
        ingredientsList.innerHTML = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
        
        document.getElementById('recipe-instructions').innerHTML = '<br>' + (recipe.instructions || "No instructions available.");
        
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

fetchRecipeDetails();
