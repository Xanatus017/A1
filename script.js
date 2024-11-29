// Get references to DOM elements
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealResult = document.querySelector('.meal-result');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', handleSearch);
recipeCloseBtn.addEventListener('click', closeRecipeModal);
mealList.addEventListener('click', getMealRecipe);

// Handles the search button click
function handleSearch() {
    const searchInputTxt = document.getElementById('search-input').value.trim();
    if (searchInputTxt) {
        fetchMealsByIngredient(searchInputTxt);
    } else {
        mealList.innerHTML = "<p>Please enter an ingredient to search!</p>";
        mealList.classList.add('notFound');
    }
}

// Fetch meals based on the ingredient
function fetchMealsByIngredient(ingredient) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => displayMealList(data.meals))
        .catch(() => {
            mealList.innerHTML = "<p>Failed to fetch meals. Please try again later.</p>";
            mealList.classList.add('notFound');
        });
}

// Display the fetched meal list
function displayMealList(meals) {
    let html = "";

    if (meals) {
        meals.forEach(meal => {
            html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "<p>Sorry, we didn't find any meals!</p>";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
}

// Get recipe of the selected meal
function getMealRecipe(e) {
    e.preventDefault();

    if (e.target.classList.contains('recipe-btn')) {
        const mealItem = e.target.parentElement.parentElement;

        // Fetch and show recipe
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => {
                mealRecipeModal(data.meals);
                mealDetailsContent.parentElement.classList.add('showRecipe');
                mealResult.classList.add('blur'); // Add blur class to meal-result
            })
            .catch(() => {
                mealDetailsContent.innerHTML = "<p>Failed to load recipe. Please try again.</p>";
                mealDetailsContent.parentElement.classList.add('showRecipe');
                mealResult.classList.add('blur'); // Add blur class to meal-result
            });
    }
}

// Create a modal for the recipe
function mealRecipeModal(meal) {
    meal = meal[0]; // Get the first meal from the array
    const html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruction">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
}

// Close the recipe modal
function closeRecipeModal() {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
    mealResult.classList.remove('blur'); // Remove blur class from meal-result
}
