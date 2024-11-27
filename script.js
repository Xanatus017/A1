const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');

// Event listeners
searchBtn.addEventListener('click', handleSearch);

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
        meals.forEach((meal) => {
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
        html = "<p>Sorry, we didn't find any meal!</p>";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
}