const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
document.getElementById('search-btn').addEventListener('click', () => {
    const ingredient = searchInput.value.trim();
    if (ingredient) {
        fetchMeals(ingredient);
    }
});


const fetchMeals = (ingredient) => {
    // Fetch meals using a promise
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch meals");
            }
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                displayNoMealsFound();
            }
        })
        .catch(error => {
            console.error(error);
            displayErrorMessage("Something went wrong. Please try again.");
        });
};

const displayMeals = (meals) => {
    // Generate and display meal list
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = meals
        .map(
            (meal) => `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `
        )
        .join("");
    mealList.classList.remove('notFound');
};

const displayNoMealsFound = () => {
    // Handle no meals found case
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = "<p>Sorry, we didn't find any meal!</p>";
    mealList.classList.add('notFound');
};

const displayErrorMessage = (message) => {
    // Display error message
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = `<p>${message}</p>`;
    mealList.classList.add('notFound');
};