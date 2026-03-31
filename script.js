const API_KEY = "64e353b32db4496ea0436273a63a0e3f";

window.onload = () => {
    showInitialState();
};

function showInitialState() {
    const recipesDiv = document.getElementById("recipes");

    recipesDiv.innerHTML = `
        <div class="empty-state">
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"/>
            <h2>Start by searching ingredients 🍅</h2>
            <p>Try something like <b>paneer, chicken, tomato</b></p>
        </div>
    `;
}

// 🔍 Fetch recipes
async function getRecipes() {
    const input = document.getElementById("ingredients").value;
    const recipesDiv = document.getElementById("recipes");
    const loading = document.getElementById("loading");

    if (!input) {
        alert("Please enter ingredients");
        return;
    }

    recipesDiv.innerHTML = "";
    loading.style.display = "block";

    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${input}&number=10&apiKey=${API_KEY}`
        );

        const data = await response.json();

        loading.style.display = "none";

        // ❌ No results
        if (!data || data.length === 0) {
            recipesDiv.innerHTML = `
                <div class="empty-state">
                    <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"/>
                    <h2>No recipes found 😕</h2>
                    <p>Try different ingredients like tomato, cheese</p>
                    <button onclick="showInitialState()">Go Back</button>
                </div>
            `;
            return;
        }

        displayRecipes(data);

    } catch (error) {
        loading.style.display = "none";
        recipesDiv.innerHTML = `
            <div class="empty-state">
                <h2>Something went wrong ⚠️</h2>
                <p>Please try again later</p>
            </div>
        `;
        console.log(error);
    }
}

// 🎨 Display cards
function displayRecipes(recipes) {
    const recipesDiv = document.getElementById("recipes");

    recipesDiv.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${recipe.image}" 
            onerror="this.src='https://via.placeholder.com/300'"/>

            <div class="card-content">
                <h3>${recipe.title.substring(0, 40)}...</h3>

                <p class="info">🍳 Used: ${recipe.usedIngredientCount}</p>
                <p class="info">⚠️ Missing: ${recipe.missedIngredientCount}</p>

                <div>
                    ${recipe.missedIngredients
                        .slice(0, 3)
                        .map(i => `<span class="tag">${i.name}</span>`)
                        .join("")}
                </div>

                <button class="view-btn">View Recipe</button>
            </div>
        `;

        recipesDiv.appendChild(card);
    });
}