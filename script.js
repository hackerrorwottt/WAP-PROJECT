// API Config
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN
const USE_DEMO_MODE = true; 

const MOCK_RECIPES = [
    {
        id: 101,
        title: "Gourmet Truffle Pasta",
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readyInMinutes: 25,
        healthScore: 92,
        servings: 2,
        instructions: "Cook pasta in salted water. Sauté garlic in butter, add truffle oil and cream. Toss pasta in sauce and top with shaved parmesan.",
        extendedIngredients: [{original: "200g Fettuccine"}, {original: "2 tsp Truffle Oil"}, {original: "50g Parmesan"}, {original: "100ml Heavy Cream"}],
        nutrition: { nutrients: [{name: "Calories", amount: 450, unit: "kcal"}, {name: "Protein", amount: 12, unit: "g"}, {name: "Fat", amount: 28, unit: "g"}, {name: "Carbohydrates", amount: 45, unit: "g"}] }
    },
    {
        id: 102,
        title: "Mediterranean Quinoa Bowl",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readyInMinutes: 15,
        healthScore: 98,
        servings: 1,
        instructions: "Assemble cooked quinoa, fresh cucumbers, cherry tomatoes, kalamata olives, and feta. Drizzle with lemon-tahini dressing.",
        extendedIngredients: [{original: "1 cup Quinoa"}, {original: "1/2 Cucumber"}, {original: "10 Cherry Tomatoes"}, {original: "2 tbsp Feta"}],
        nutrition: { nutrients: [{name: "Calories", amount: 320, unit: "kcal"}, {name: "Protein", amount: 15, unit: "g"}, {name: "Fat", amount: 10, unit: "g"}, {name: "Carbohydrates", amount: 38, unit: "g"}] }
    },
    {
        id: 103,
        title: "Pan-Seared Salmon with Asparagus",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readyInMinutes: 20,
        healthScore: 95,
        servings: 2,
        instructions: "Season salmon with lemon and herbs. Sear in a hot pan for 4 mins each side. Steam asparagus and serve with a dollop of herb butter.",
        extendedIngredients: [{original: "2 Salmon Fillets"}, {original: "1 bunch Asparagus"}, {original: "1 Lemon"}, {original: "Fresh Dill"}],
        nutrition: { nutrients: [{name: "Calories", amount: 380, unit: "kcal"}, {name: "Protein", amount: 34, unit: "g"}, {name: "Fat", amount: 22, unit: "g"}, {name: "Carbohydrates", amount: 5, unit: "g"}] }
    },
    {
        id: 104,
        title: "Wild Mushroom Risotto",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readyInMinutes: 40,
        healthScore: 88,
        servings: 4,
        instructions: "Toast arborio rice. Gradually add hot stock while stirring. Fold in sautéed wild mushrooms and finish with cold butter and parmesan.",
        extendedIngredients: [{original: "300g Arborio Rice"}, {original: "400g Mixed Mushrooms"}, {original: "1L Vegetable Stock"}, {original: "1 Shallot"}],
        nutrition: { nutrients: [{name: "Calories", amount: 410, unit: "kcal"}, {name: "Protein", amount: 8, unit: "g"}, {name: "Fat", amount: 15, unit: "g"}, {name: "Carbohydrates", amount: 62, unit: "g"}] }
    },
    {
        id: 105,
        title: "Avocado & Egg Sourdough Toast",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readyInMinutes: 10,
        healthScore: 90,
        servings: 1,
        instructions: "Toast sourdough. Smash avocado with chili flakes and lime. Top with a poached egg and microgreens.",
        extendedIngredients: [{original: "1 slice Sourdough"}, {original: "1 Avocado"}, {original: "1 Large Egg"}, {original: "Chili Flakes"}],
        nutrition: { nutrients: [{name: "Calories", amount: 290, unit: "kcal"}, {name: "Protein", amount: 11, unit: "g"}, {name: "Fat", amount: 18, unit: "g"}, {name: "Carbohydrates", amount: 20, unit: "g"}] }
    },
    {
        id: 106,
        title: "Thai Green Curry",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readyInMinutes: 30,
        healthScore: 85,
        servings: 3,
        instructions: "Simmer green curry paste with coconut milk. Add bamboo shoots, beans, and your protein of choice. Serve over jasmine rice.",
        extendedIngredients: [{original: "400ml Coconut Milk"}, {original: "2 tbsp Green Curry Paste"}, {original: "200g Bamboo Shoots"}, {original: "Thai Basil"}],
        nutrition: { nutrients: [{name: "Calories", amount: 520, unit: "kcal"}, {name: "Protein", amount: 14, unit: "g"}, {name: "Fat", amount: 35, unit: "g"}, {name: "Carbohydrates", amount: 42, unit: "g"}] }
    }
];

// State Management
let recipes = [];
let bookmarks = JSON.parse(localStorage.getItem('nexbite_bookmarks')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('nexbite_recent')) || [];
let currentCategory = 'trending';

// Selectors
const recipeGrid = document.getElementById('recipe-grid');
const recentRecipesContainer = document.getElementById('recent-recipes');
const globalSearch = document.getElementById('global-search');
const aiIngredients = document.getElementById('ai-ingredients');
const generateAiBtn = document.getElementById('generate-ai-recipe');
const aiResponseContainer = document.getElementById('ai-response');
const bookmarkCount = document.getElementById('bookmark-count');
const chips = document.querySelectorAll('.chip');
const modal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingRecipes();
    updateBookmarkUI();
    renderRecentRecipes();
    initEventListeners();
    animateCategories();
});

function initEventListeners() {
    // Search
    globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchRecipes(globalSearch.value);
        }
    });

    // Categories
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentCategory = chip.dataset.type;
            fetchByCategory(currentCategory);
        });
    });

    // AI Chef
    generateAiBtn.addEventListener('click', handleAiRecipeGeneration);

    // AI CTA Scroll listeners
    const aiCookCta = document.getElementById('ai-cook-cta');
    const heroAiBtn = document.getElementById('hero-ai-btn');
    const heroExploreBtn = document.getElementById('hero-explore-btn');

    if (aiCookCta) {
        aiCookCta.addEventListener('click', () => {
            document.getElementById('ai-chef')?.scrollIntoView({ behavior: 'smooth' });
            aiIngredients.focus();
        });
    }

    if (heroAiBtn) {
        heroAiBtn.addEventListener('click', () => {
            document.getElementById('ai-chef')?.scrollIntoView({ behavior: 'smooth' });
            aiIngredients.focus();
        });
    }

    if (heroExploreBtn) {
        heroExploreBtn.addEventListener('click', () => {
            document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Bookmarks Toggle
    document.getElementById('bookmark-toggle').addEventListener('click', showBookmarks);
}

// --- RECIPE FETCHING (SPOONACULAR) ---

async function fetchTrendingRecipes() {
    showSkeletons();
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=9`);
        if (!response.ok && USE_DEMO_MODE) throw new Error('Quota limit');
        const data = await response.json();
        recipes = data.recipes;
        renderRecipes(recipes);
    } catch (error) {
        console.warn('Using Demo Mode Data...', error);
        recipes = MOCK_RECIPES;
        renderRecipes(recipes);
    }
}

async function searchRecipes(query) {
    if (!query) return;
    showSkeletons();
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=true&number=12`);
        if (!response.ok && USE_DEMO_MODE) throw new Error('Quota limit');
        const data = await response.json();
        recipes = data.results;
        renderRecipes(recipes);
        recipeGrid.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.warn('Search falling back to demo data', error);
        const filtered = MOCK_RECIPES.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));
        recipes = filtered.length > 0 ? filtered : MOCK_RECIPES;
        renderRecipes(recipes);
    }
}

async function fetchByCategory(category) {
    showSkeletons();
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&addRecipeInformation=true&number=12&type=${category}`;
    
    if (category === 'trending') {
        fetchTrendingRecipes();
        return;
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok && USE_DEMO_MODE) throw new Error('Quota limit');
        const data = await response.json();
        recipes = data.results;
        renderRecipes(recipes);
    } catch (error) {
        console.warn('Category falling back to demo data', error);
        recipes = MOCK_RECIPES;
        renderRecipes(recipes);
    }
}

// --- RENDERING ---

function renderRecipes(recipeList) {
    recipeGrid.innerHTML = '';
    
    if (!recipeList || recipeList.length === 0) {
        recipeGrid.innerHTML = '<div class="no-results">No recipes found matching your search.</div>';
        return;
    }

    recipeList.map(recipe => {
        const isBookmarked = bookmarks.some(b => b.id === recipe.id);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="card-img-wrapper" onclick="openRecipeDetails(${recipe.id})">
                <img src="${recipe.image || 'https://via.placeholder.com/400x300?text=No+Image'}" alt="${recipe.title}">
                <div class="card-overlay"></div>
                <div class="card-tag">${recipe.readyInMinutes ? recipe.readyInMinutes + ' min' : 'Quick'}</div>
                <button class="bookmark-icon ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark(event, ${recipe.id})">
                    <i data-lucide="heart" style="fill: ${isBookmarked ? 'var(--accent-color)' : 'none'}"></i>
                </button>
            </div>
            <div class="card-content" onclick="openRecipeDetails(${recipe.id})">
                <h3>${recipe.title}</h3>
                <div class="card-meta">
                    <span><i data-lucide="flame" style="width: 14px; display: inline-block;"></i> ${recipe.healthScore || '80'} Score</span>
                    <span>${recipe.servings || '2'} Servings</span>
                </div>
            </div>
        `;
        recipeGrid.appendChild(card);
    });
    
    lucide.createIcons();
}

function showSkeletons() {
    recipeGrid.innerHTML = `
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
    `;
}

// --- BOOKMARK LOGIC ---

function toggleBookmark(event, id) {
    event.stopPropagation();
    const recipe = recipes.find(r => r.id === id) || bookmarks.find(b => b.id === id);
    
    const index = bookmarks.findIndex(b => b.id === id);
    if (index === -1) {
        bookmarks.push(recipe);
        showNotification('Saved to favorites');
    } else {
        bookmarks.splice(index, 1);
        showNotification('Removed from favorites');
    }
    
    localStorage.setItem('nexbite_bookmarks', JSON.stringify(bookmarks));
    updateBookmarkUI();
    
    // Refresh grid if on bookmarks view
    if (currentCategory === 'bookmarks') {
        renderRecipes(bookmarks);
    } else {
        renderRecipes(recipes); // Update heart icons in main grid
    }
}

function updateBookmarkUI() {
    bookmarkCount.innerText = bookmarks.length;
    bookmarkCount.style.display = bookmarks.length > 0 ? 'flex' : 'none';
}

function showBookmarks() {
    currentCategory = 'bookmarks';
    chips.forEach(c => c.classList.remove('active'));
    renderRecipes(bookmarks);
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

// --- AI CHEF LOGIC (HUGGING FACE) ---

async function handleAiRecipeGeneration() {
    const ingredients = aiIngredients.value;
    if (!ingredients) {
        showNotification('Please enter some ingredients!', 'warning');
        return;
    }

    generateAiBtn.disabled = true;
    generateAiBtn.innerHTML = '<span class="loader"></span> Thinking...';
    aiResponseContainer.innerHTML = '<div class="skeleton-card" style="grid-column: 1/-1; height: 150px;"></div>';

    try {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: "You are 'NexBite AI Chef'. Suggest unique, gourmet recipes using only the provided ingredients. Format the response as JSON with: { 'recipes': [{ 'name': '...', 'description': '...', 'time': '...', 'difficulty': '...' }] }. Keep it creative."
                        },
                        {
                            role: "user",
                            content: `I have: ${ingredients}`,
                        },
                    ],
                    model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B:nscale",
                    max_tokens: 500,
                }),
            }
        );
        
        const result = await response.json();
        const content = result.choices[0].message.content;
        
        // Parsing logic for AI response (handles both pure JSON and reasoning block)
        let jsonStr = content;
        if (content.includes('```json')) {
            jsonStr = content.split('```json')[1].split('```')[0];
        } else if (content.includes('{')) {
            jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
        }

        const data = JSON.parse(jsonStr);
        displayAiRecipes(data.recipes);
        
    } catch (error) {
        console.error('AI error:', error);
        aiResponseContainer.innerHTML = '<div class="error-msg">AI is resting. Try again soon.</div>';
    } finally {
        generateAiBtn.disabled = false;
        generateAiBtn.innerHTML = 'Generate Recipe';
    }
}

function displayAiRecipes(aiRecipes) {
    aiResponseContainer.innerHTML = '';
    aiRecipes.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'glass-card ai-recipe-card';
        div.style.padding = '24px';
        div.style.textAlign = 'left';
        div.innerHTML = `
            <div style="font-weight: 800; font-size: 1.2rem; color: var(--accent-color); margin-bottom: 8px;">${recipe.name}</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">${recipe.description}</p>
            <div style="display: flex; gap: 16px; font-size: 0.8rem; color: var(--text-muted);">
                <span><i data-lucide="clock"></i> ${recipe.time}</span>
                <span><i data-lucide="zap"></i> ${recipe.difficulty}</span>
            </div>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 20px; font-size: 0.8rem;" onclick="searchRecipes('${recipe.name}')">Find Instructions</button>
        `;
        aiResponseContainer.appendChild(div);
    });
    lucide.createIcons();
}

// --- MODAL & DETAILS ---

async function openRecipeDetails(id) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalBody.innerHTML = '<div class="skeleton-card" style="height: 400px;"></div>';

    try {
        let recipe;
        if (id > 100 && id < 200) {
            recipe = MOCK_RECIPES.find(r => r.id === id);
        } else {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`);
            if (!response.ok) throw new Error('Quota limit');
            recipe = await response.json();
        }
        
        saveToRecent(recipe);
        
        const nutrition = recipe.nutrition.nutrients.filter(n => ['Calories', 'Protein', 'Fat', 'Carbohydrates'].includes(n.name));

        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-img">
                    <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 20px; box-shadow: var(--layer-card);">
                </div>
                <div class="modal-info">
                    <h2 style="font-size: 2.5rem; font-family: var(--font-outfit); margin-bottom: 16px;">${recipe.title}</h2>
                    <div style="display: flex; gap: 20px; margin-bottom: 30px;">
                        <div class="badge-pill">${recipe.readyInMinutes} Min</div>
                        <div class="badge-pill">${recipe.servings} Servings</div>
                        <div class="badge-pill">${recipe.healthScore} Health Score</div>
                    </div>
                    
                    <div class="nutrition-grid">
                        ${nutrition.map(n => `
                            <div class="nutri-item">
                                <span class="nutri-val">${Math.round(n.amount)}${n.unit}</span>
                                <span class="nutri-label">${n.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="modal-tabs" style="margin-top: 40px; display: flex; gap: 40px; border-bottom: 1px solid var(--glass-stroke); padding-bottom: 10px;">
                <span style="font-weight: 700; color: var(--accent-color); border-bottom: 2px solid var(--accent-color); cursor: pointer;">Ingredients</span>
            </div>
            
            <ul style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; color: var(--text-secondary);">
                ${recipe.extendedIngredients.map(ing => `<li><i data-lucide="check" style="width: 14px; color: var(--accent-color);"></i> ${ing.original}</li>`).join('')}
            </ul>

            <div class="modal-tabs" style="margin-top: 40px; display: flex; gap: 40px; border-bottom: 1px solid var(--glass-stroke); padding-bottom: 10px;">
                <span style="font-weight: 700; color: var(--accent-color);">Instructions</span>
            </div>
            <div style="margin-top: 20px; color: var(--text-secondary); line-height: 1.8;">
                ${recipe.instructions || 'Check full instructions on the official recipe site.'}
            </div>
        `;
        lucide.createIcons();
    } catch (error) {
        console.error('Modal error:', error);
        modalBody.innerHTML = '<div class="error-msg">Failed to load details.</div>';
    }
}

// --- UI UTILS ---

function showNotification(msg, type = 'success') {
    const container = document.getElementById('notification-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = msg;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// --- RECENTLY VIEWED ---

function saveToRecent(recipe) {
    const exists = recentlyViewed.find(r => r.id === recipe.id);
    if (!exists) {
        recentlyViewed.unshift(recipe);
        if (recentlyViewed.length > 5) recentlyViewed.pop();
        localStorage.setItem('nexbite_recent', JSON.stringify(recentlyViewed));
        renderRecentRecipes();
    }
}

function renderRecentRecipes() {
    if (!recentRecipesContainer) return;
    recentRecipesContainer.innerHTML = '';
    recentlyViewed.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'glass-card recent-mini-card';
        card.style.display = 'flex';
        card.style.gap = '16px';
        card.style.padding = '12px';
        card.style.minWidth = '300px';
        card.style.cursor = 'pointer';
        card.style.background = 'var(--glass-bg)';
        card.style.borderRadius = '16px';
        card.style.border = '1px solid var(--glass-stroke)';
        card.onclick = () => openRecipeDetails(recipe.id);
        card.innerHTML = `
            <img src="${recipe.image}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;">
            <div>
                <h4 style="font-size: 0.9rem; margin-bottom: 4px;">${recipe.title}</h4>
                <div style="font-size: 0.75rem; color: var(--text-muted);"><i data-lucide="clock"></i> ${recipe.readyInMinutes} Min</div>
            </div>
        `;
        recentRecipesContainer.appendChild(card);
    });
    lucide.createIcons();
}

function animateCategories() {
    const chipArray = Array.from(chips);
    chipArray.forEach((chip, i) => {
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chip.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            chip.style.opacity = '1';
            chip.style.transform = 'translateY(0)';
        }, 100 * i);
    });
}

// CSS for toasts and minor details not in style.css
const extraStyles = `
    #notification-container { position: fixed; bottom: 30px; right: 30px; z-index: 3000; }
    .toast { background: var(--card-dark); border: 1px solid var(--accent-color); padding: 12px 24px; border-radius: 12px; margin-bottom: 10px; box-shadow: var(--layer-card); animation: slideIn 0.3s forwards; }
    .badge-pill { background: var(--glass-bg); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
    .nutrition-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 20px; }
    .nutri-item { background: var(--glass-bg); padding: 12px; border-radius: 12px; text-align: center; }
    .nutri-val { display: block; font-weight: 800; font-size: 1rem; color: var(--text-primary); }
    .nutri-label { font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; }
    .modal-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; }
    .ai-recipe-card { transition: var(--transition-smooth); }
    .ai-recipe-card:hover { transform: translateY(-5px); border-color: var(--accent-color); }
    @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @media (max-width: 768px) { .modal-grid { grid-template-columns: 1fr; } }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = extraStyles;
document.head.appendChild(styleSheet);
