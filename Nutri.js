// Supabase Configuration
const SUPABASE_URL = 'https://knbwwhsrsszrhrcsgvxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYnd3aHNyc3N6cmhyY3NndnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDIxMTUsImV4cCI6MjA3Njk3ODExNX0.W0gogF-_MIzPPWv3MoN-xPUgDaQQJzGDrXhPJsl6Qpw';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Data Storage
let userData = {
  username: "",
  email: "",
  goal: "",
  budget: 1000,
  cart: [],
  weeklyPlan: {},
  reviews: [],
  ingredients: [],
  recipeIngredients: [],
  dailyCalories: 0,
  targetCalories: 2000,
}

// Grocery Data with real images
const groceries = {
  "weight-loss": {
    proteins: [
      {
        name: "Chicken Breast",
        price: 250,
        img: "https://img.icons8.com/color/96/000000/chicken.png",
        tags: ["Lean Protein"],
        protein: 25,
        carbs: 0,
        fats: 3,
        fiber: 0,
        calories: 120,
      },
      {
        name: "Egg Whites",
        price: 150,
        img: "https://img.icons8.com/color/96/000000/egg.png",
        tags: ["Low Fat"],
        protein: 11,
        carbs: 1,
        fats: 0,
        fiber: 0,
        calories: 50,
      },
    ],
    carbs: [
      {
        name: "Brown Rice",
        price: 80,
        img: "https://img.icons8.com/color/96/000000/rice.png",
        tags: ["Whole Grain"],
        protein: 3,
        carbs: 45,
        fats: 1,
        fiber: 4,
        calories: 200,
      },
      {
        name: "Quinoa",
        price: 200,
        img: "https://img.icons8.com/color/96/000000/grain.png",
        tags: ["High Fiber"],
        protein: 8,
        carbs: 39,
        fats: 3,
        fiber: 5,
        calories: 220,
      },
    ],
    vegetables: [
      {
        name: "Spinach",
        price: 40,
        img: "https://img.icons8.com/color/96/000000/spinach.png",
        tags: ["Low Calorie"],
        protein: 3,
        carbs: 4,
        fats: 0,
        fiber: 2,
        calories: 25,
      },
      {
        name: "Broccoli",
        price: 60,
        img: "https://img.icons8.com/color/96/000000/broccoli.png",
        tags: ["Fiber"],
        protein: 3,
        carbs: 6,
        fats: 0,
        fiber: 3,
        calories: 30,
      },
    ],
    fruits: [
      {
        name: "Apples",
        price: 100,
        img: "https://img.icons8.com/color/96/000000/apple.png",
        tags: ["Fiber"],
        protein: 0,
        carbs: 25,
        fats: 0,
        fiber: 4,
        calories: 95,
      },
      {
        name: "Berries",
        price: 180,
        img: "https://img.icons8.com/color/96/000000/blueberries.png",
        tags: ["Antioxidants"],
        protein: 1,
        carbs: 12,
        fats: 0,
        fiber: 4,
        calories: 50,
      },
    ],
    snacks: [
      {
        name: "Almonds",
        price: 300,
        img: "https://img.icons8.com/color/96/000000/almond.png",
        tags: ["Healthy Fat"],
        protein: 6,
        carbs: 6,
        fats: 14,
        fiber: 4,
        calories: 160,
      },
      {
        name: "Greek Yogurt",
        price: 120,
        img: "https://img.icons8.com/color/96/000000/yogurt.png",
        tags: ["Protein"],
        protein: 15,
        carbs: 6,
        fats: 0,
        fiber: 0,
        calories: 100,
      },
    ],
  },
  "muscle-gain": {
    proteins: [
      {
        name: "Lean Beef",
        price: 350,
        img: "https://img.icons8.com/color/96/000000/meat.png",
        tags: ["High Protein"],
        protein: 26,
        carbs: 0,
        fats: 15,
        fiber: 0,
        calories: 250,
      },
      {
        name: "Tofu",
        price: 120,
        img: "https://img.icons8.com/color/96/000000/tofu.png",
        tags: ["Plant Protein"],
        protein: 10,
        carbs: 2,
        fats: 6,
        fiber: 1,
        calories: 94,
      },
    ],
    carbs: [
      {
        name: "Oats",
        price: 90,
        img: "https://img.icons8.com/color/96/000000/oatmeal.png",
        tags: ["Energy"],
        protein: 5,
        carbs: 27,
        fats: 3,
        fiber: 4,
        calories: 150,
      },
      {
        name: "Sweet Potato",
        price: 70,
        img: "https://img.icons8.com/color/96/000000/sweet-potato.png",
        tags: ["Complex Carb"],
        protein: 2,
        carbs: 27,
        fats: 0,
        fiber: 4,
        calories: 112,
      },
    ],
    vegetables: [
      {
        name: "Kale",
        price: 50,
        img: "https://img.icons8.com/color/96/000000/kale.png",
        tags: ["Micronutrients"],
        protein: 2,
        carbs: 7,
        fats: 1,
        fiber: 1,
        calories: 35,
      },
      {
        name: "Bell Peppers",
        price: 60,
        img: "https://img.icons8.com/color/96/000000/bell-pepper.png",
        tags: ["Vitamin C"],
        protein: 1,
        carbs: 7,
        fats: 0,
        fiber: 3,
        calories: 30,
      },
    ],
    fruits: [
      {
        name: "Bananas",
        price: 60,
        img: "https://img.icons8.com/color/96/000000/banana.png",
        tags: ["Potassium"],
        protein: 1,
        carbs: 27,
        fats: 0,
        fiber: 3,
        calories: 105,
      },
      {
        name: "Oranges",
        price: 80,
        img: "https://img.icons8.com/color/96/000000/orange.png",
        tags: ["Vitamin C"],
        protein: 1,
        carbs: 15,
        fats: 0,
        fiber: 3,
        calories: 60,
      },
    ],
    snacks: [
      {
        name: "Peanut Butter",
        price: 200,
        img: "https://img.icons8.com/color/96/000000/peanut-butter.png",
        tags: ["Calorie Dense"],
        protein: 8,
        carbs: 8,
        fats: 16,
        fiber: 2,
        calories: 190,
      },
      {
        name: "Protein Bar",
        price: 150,
        img: "https://img.icons8.com/color/96/000000/protein-bar.png",
        tags: ["Convenient"],
        protein: 20,
        carbs: 25,
        fats: 8,
        fiber: 3,
        calories: 240,
      },
    ],
  },
  "healthy-living": {
    proteins: [
      {
        name: "Paneer",
        price: 200,
        img: "https://img.icons8.com/color/96/000000/cheese.png",
        tags: ["Calcium"],
        protein: 18,
        carbs: 3,
        fats: 20,
        fiber: 0,
        calories: 265,
      },
      {
        name: "Lentils",
        price: 100,
        img: "https://img.icons8.com/color/96/000000/lentils.png",
        tags: ["Plant Protein"],
        protein: 9,
        carbs: 20,
        fats: 0,
        fiber: 8,
        calories: 115,
      },
    ],
    carbs: [
      {
        name: "Whole Wheat Bread",
        price: 50,
        img: "https://img.icons8.com/color/96/000000/bread.png",
        tags: ["Fiber"],
        protein: 4,
        carbs: 12,
        fats: 1,
        fiber: 2,
        calories: 70,
      },
      {
        name: "Millets",
        price: 90,
        img: "https://img.icons8.com/color/96/000000/grain.png",
        tags: ["Low GI"],
        protein: 4,
        carbs: 23,
        fats: 1,
        fiber: 1,
        calories: 119,
      },
    ],
    vegetables: [
      {
        name: "Carrots",
        price: 40,
        img: "https://img.icons8.com/color/96/000000/carrot.png",
        tags: ["Vitamin A"],
        protein: 1,
        carbs: 10,
        fats: 0,
        fiber: 3,
        calories: 41,
      },
      {
        name: "Cucumber",
        price: 30,
        img: "https://img.icons8.com/color/96/000000/cucumber.png",
        tags: ["Hydration"],
        protein: 1,
        carbs: 4,
        fats: 0,
        fiber: 1,
        calories: 16,
      },
    ],
    fruits: [
      {
        name: "Papaya",
        price: 70,
        img: "https://img.icons8.com/color/96/000000/papaya.png",
        tags: ["Digestion"],
        protein: 1,
        carbs: 11,
        fats: 0,
        fiber: 2,
        calories: 43,
      },
      {
        name: "Mango",
        price: 120,
        img: "https://img.icons8.com/color/96/000000/mango.png",
        tags: ["Vitamin C"],
        protein: 1,
        carbs: 25,
        fats: 0,
        fiber: 3,
        calories: 99,
      },
    ],
    snacks: [
      {
        name: "Trail Mix",
        price: 250,
        img: "https://img.icons8.com/color/96/000000/trail-mix.png",
        tags: ["Balanced"],
        protein: 7,
        carbs: 20,
        fats: 12,
        fiber: 3,
        calories: 200,
      },
      {
        name: "Coconut Water",
        price: 80,
        img: "https://img.icons8.com/color/96/000000/coconut.png",
        tags: ["Hydration"],
        protein: 1,
        carbs: 9,
        fats: 0,
        fiber: 0,
        calories: 45,
      },
    ],
  },
}

// Meal Database - FIXED with more meals
const mealDatabase = {
  "Chicken Rice": {
    ingredients: ["Chicken Breast", "Brown Rice"],
    time: "30 mins",
    servings: 2,
    calories: 450,
    instructions: ["Cook rice in water", "Grill chicken breast", "Season with herbs", "Serve together"],
  },
  "Egg Spinach Omelette": {
    ingredients: ["Egg Whites", "Spinach"],
    time: "15 mins",
    servings: 1,
    calories: 120,
    instructions: ["Beat eggs", "Heat pan with oil", "Add spinach", "Pour eggs and fold", "Cook until done"],
  },
  "Tofu Stir Fry": {
    ingredients: ["Tofu", "Bell Peppers"],
    time: "20 mins",
    servings: 2,
    calories: 200,
    instructions: ["Cut tofu into cubes", "Heat wok", "Add tofu and peppers", "Stir fry for 10 mins", "Add soy sauce"],
  },
  "Oats Banana Breakfast": {
    ingredients: ["Oats", "Bananas"],
    time: "10 mins",
    servings: 1,
    calories: 255,
    instructions: ["Boil water", "Add oats", "Cook for 5 mins", "Top with banana slices", "Add honey"],
  },
  "Paneer Spinach Curry": {
    ingredients: ["Paneer", "Spinach"],
    time: "25 mins",
    servings: 2,
    calories: 350,
    instructions: ["Blanch spinach", "Blend spinach", "Cook paneer cubes", "Add spinach paste", "Simmer 10 mins"],
  },
  "Lentil Soup": {
    ingredients: ["Lentils", "Carrots"],
    time: "35 mins",
    servings: 3,
    calories: 200,
    instructions: ["Soak lentils", "Boil with water", "Add chopped carrots", "Cook until soft", "Season and serve"],
  },
  "Quinoa Salad": {
    ingredients: ["Quinoa", "Carrots", "Cucumber"],
    time: "20 mins",
    servings: 2,
    calories: 280,
    instructions: ["Cook quinoa", "Chop vegetables", "Mix in bowl", "Add olive oil dressing", "Toss well"],
  },
  "Grilled Vegetables": {
    ingredients: ["Broccoli", "Bell Peppers", "Carrots"],
    time: "15 mins",
    servings: 2,
    calories: 120,
    instructions: ["Cut vegetables", "Heat grill", "Grill each vegetable", "Season with herbs", "Serve hot"],
  },
  "Protein Smoothie": {
    ingredients: ["Greek Yogurt", "Berries", "Bananas"],
    time: "5 mins",
    servings: 1,
    calories: 250,
    instructions: ["Add yogurt to blender", "Add berries and banana", "Blend until smooth", "Pour and serve"],
  },
  "Almonds Trail Mix": {
    ingredients: ["Almonds", "Berries"],
    time: "2 mins",
    servings: 1,
    calories: 300,
    instructions: ["Mix almonds", "Add dried berries", "Store in container", "Enjoy as snack"],
  },
  "Sweet Potato Bowl": {
    ingredients: ["Sweet Potato", "Kale", "Almonds"],
    time: "25 mins",
    servings: 1,
    calories: 380,
    instructions: ["Roast sweet potato", "Saute kale", "Combine in bowl", "Top with almonds", "Drizzle olive oil"],
  },
  "Chicken Salad": {
    ingredients: ["Chicken Breast", "Spinach", "Apples"],
    time: "20 mins",
    servings: 2,
    calories: 280,
    instructions: ["Grill chicken", "Chop vegetables", "Mix in bowl", "Add dressing", "Toss and serve"],
  },
  "Egg Fried Rice": {
    ingredients: ["Egg Whites", "Brown Rice", "Bell Peppers"],
    time: "15 mins",
    servings: 2,
    calories: 320,
    instructions: [
      "Heat oil",
      "Add cooked rice",
      "Push to side, scramble eggs",
      "Mix with rice",
      "Add peppers and soy sauce",
    ],
  },
  "Paneer Tikka": {
    ingredients: ["Paneer", "Bell Peppers", "Onions"],
    time: "30 mins",
    servings: 2,
    calories: 300,
    instructions: ["Marinate paneer", "Skewer with vegetables", "Grill until charred", "Serve with chutney"],
  },
  "Lentil Salad": {
    ingredients: ["Lentils", "Carrots", "Cucumber"],
    time: "30 mins",
    servings: 2,
    calories: 220,
    instructions: ["Cook lentils", "Cool completely", "Chop vegetables", "Mix together", "Add lemon dressing"],
  },
  "Beef Broccoli": {
    ingredients: ["Lean Beef", "Broccoli"],
    time: "20 mins",
    servings: 2,
    calories: 350,
    instructions: ["Cut beef into strips", "Heat wok", "Cook beef", "Add broccoli", "Season and serve"],
  },
  "Tofu Spinach": {
    ingredients: ["Tofu", "Spinach", "Garlic"],
    time: "15 mins",
    servings: 2,
    calories: 180,
    instructions: ["Press tofu", "Heat oil", "Add garlic", "Add tofu and spinach", "Cook until done"],
  },
  "Rice Vegetable": {
    ingredients: ["Brown Rice", "Broccoli", "Carrots"],
    time: "25 mins",
    servings: 2,
    calories: 280,
    instructions: ["Cook rice", "Steam vegetables", "Mix together", "Add soy sauce", "Serve hot"],
  },
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus()
  loadData()
  setupEventListeners()
})

// Check Login Status
async function checkLoginStatus() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  
  document.getElementById("logout-btn").classList.remove("hidden");
  
  // Load user data from Supabase
  await loadUserDataFromSupabase(user.id);
  
  // Show welcome message
  if (userData.username && userData.username !== "") {
    showNotification("Welcome back, " + userData.username + "!");
  }
}

// Load user data from Supabase
async function loadUserDataFromSupabase(userId) {
  try {
    const { data, error } = await supabaseClient
      .from('user_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error loading user data:', error);
      return;
    }

    if (data) {
      userData = {
        username: data.username || "",
        email: data.email || "",
        goal: data.goal || "",
        budget: data.budget || 1000,
        cart: data.cart || [],
        weeklyPlan: data.weekly_plan || {},
        reviews: data.reviews || [],
        ingredients: data.ingredients || [],
        recipeIngredients: data.recipe_ingredients || [],
        dailyCalories: data.daily_calories || 0,
        targetCalories: data.target_calories || 2000,
      };
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}

// Load data from localStorage (fallback)
function loadData() {
  const saved = localStorage.getItem("nutriKartData")
  if (saved) {
    userData = JSON.parse(saved)
  }
}

// Save data to Supabase
async function saveData() {
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) {
      console.error('No user logged in');
      return;
    }

    const { error } = await supabaseClient
      .from('user_data')
      .upsert({
        user_id: user.id,
        username: userData.username,
        email: userData.email,
        goal: userData.goal,
        budget: userData.budget,
        cart: userData.cart,
        weekly_plan: userData.weeklyPlan,
        reviews: userData.reviews,
        ingredients: userData.ingredients,
        recipe_ingredients: userData.recipeIngredients,
        daily_calories: userData.dailyCalories,
        target_calories: userData.targetCalories,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving user data:', error);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
  }
  
  // Keep localStorage as backup
  localStorage.setItem("nutriKartData", JSON.stringify(userData))
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const section = e.target.dataset.section
      showSection(section)
      updateNavigation(e.target)
    })
  })

  // Dark Mode Toggle
  document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode)

  // Logout
  document.getElementById("logout-btn").addEventListener("click", handleLogout)

  // Start Button
  document.getElementById("start-btn").addEventListener("click", () => {
    showSection("goals")
    updateNavigation(document.querySelector('[data-section="goals"]'))
  })

  // Goal Selection
  document.querySelectorAll(".goal-card").forEach((card) => {
    card.addEventListener("click", selectGoal)
  })

  // Budget Range
  document.getElementById("budget-range").addEventListener("input", updateBudgetDisplay)

  // Tabs
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-button").forEach((b) => b.classList.remove("active"))
      e.target.classList.add("active")
      loadGroceries(e.target.dataset.tab)
    })
  })

  // Ingredients
  document.getElementById("add-ingredient-btn").addEventListener("click", addIngredient)
  document.getElementById("ingredient-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addIngredient()
  })

  // Recipe Ingredients
  document.getElementById("add-recipe-ingredient-btn").addEventListener("click", addRecipeIngredient)
  document.getElementById("recipe-ingredient-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addRecipeIngredient()
  })

  // Generate Recipe
  document.getElementById("generate-recipe-btn").addEventListener("click", generateRecipe)

  // Cart Actions
  document.getElementById("print-list-btn").addEventListener("click", printList)
  document.getElementById("share-list-btn").addEventListener("click", shareList)
  document.getElementById("clear-cart-btn").addEventListener("click", clearCart)

  // Weekly Planner
  document.getElementById("generate-shopping-list-btn").addEventListener("click", generateShoppingFromPlan)
  document.getElementById("clear-plan-btn").addEventListener("click", clearWeeklyPlan)

  // Feedback
  document.getElementById("feedback-form").addEventListener("submit", submitFeedback)
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", (e) => {
      const rating = e.target.dataset.value
      document.querySelectorAll(".star").forEach((s, i) => {
        if (i < rating) s.classList.add("active")
        else s.classList.remove("active")
      })
      document.getElementById("rating-text").textContent = "Rating: " + rating + " stars"
    })
  })

  // Edit Profile
  document.getElementById("edit-profile-btn").addEventListener("click", editProfile)
}

// Logout Handler
async function handleLogout() {
  try {
    await supabaseClient.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
  
  // Clear local storage
  localStorage.removeItem("nutriKartData")
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("currentUser")
  
  window.location.href = "login.html"
}

// Show Section
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden")
  })
  document.getElementById(sectionId).classList.remove("hidden")

  if (sectionId === "groceries") loadGroceries("proteins")
  if (sectionId === "dashboard") updateDashboard()
  if (sectionId === "weekly-plan") loadWeeklyPlanner()
  if (sectionId === "cart") updateCart()
  if (sectionId === "meals") loadSuggestedMeals()
  if (sectionId === "recipes") loadRecipeIngredients()
  if (sectionId === "feedback") loadReviews()
}

// Update Navigation
function updateNavigation(activeBtn) {
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"))
  activeBtn.classList.add("active")
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))
}

// Select Goal
function selectGoal(e) {
  document.querySelectorAll(".goal-card").forEach((card) => card.classList.remove("selected"))
  e.currentTarget.classList.add("selected")
  userData.goal = e.currentTarget.dataset.goal
  document.getElementById("budget").classList.remove("hidden")
  saveData()
}

// Update Budget Display
function updateBudgetDisplay(e) {
  document.getElementById("budget-value").textContent = e.target.value
  userData.budget = Number.parseInt(e.target.value)
  saveData()
}

// Continue to Dashboard
function continueToDashboard() {
  if (!userData.goal) {
    showNotification("Please select a goal first")
    return
  }
  showSection("groceries")
  updateNavigation(document.querySelector('[data-section="groceries"]'))
}

// Load Groceries from Supabase
async function loadGroceries(category) {
  const grid = document.getElementById("grocery-grid")
  grid.innerHTML = ""

  if (!userData.goal) {
    grid.innerHTML = "<p>Please select a goal first</p>"
    return
  }

  try {
    const { data, error } = await supabaseClient
      .from('groceries')
      .select('*')
      .eq('goal', userData.goal)
      .eq('category', category);

    if (error) {
      console.error('Error loading groceries:', error);
      // Fallback to local data
      const items = groceries[userData.goal][category] || []
      renderGroceryItems(items, grid)
      return
    }

    renderGroceryItems(data || [], grid)
  } catch (error) {
    console.error('Error loading groceries:', error);
    // Fallback to local data
    const items = groceries[userData.goal][category] || []
    renderGroceryItems(items, grid)
  }
}

// Render grocery items
function renderGroceryItems(items, grid) {
  items.forEach((item) => {
    const div = document.createElement("div")
    div.className = "grocery-item"
    if (userData.cart.some((c) => c.name === item.name)) {
      div.classList.add("added")
    }
    div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="grocery-image">
            <h4>${item.name}</h4>
            <p class="grocery-price">Rs${item.price}</p>
            <div class="grocery-tags">
                ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 8px;">${item.calories} cal</p>
        `
    div.addEventListener("click", () => addToCart(item))
    grid.appendChild(div)
  })
}

// Add to Cart
function addToCart(item) {
  const existing = userData.cart.find((c) => c.name === item.name)
  if (existing) {
    userData.cart = userData.cart.filter((c) => c.name !== item.name)
    userData.dailyCalories -= item.calories
    showNotification("Removed from cart")
  } else {
    userData.cart.push(item)
    userData.dailyCalories += item.calories
    showNotification(item.name + " added to cart")
  }
  saveData()
  loadGroceries(document.querySelector(".tab-button.active").dataset.tab)
  updateCart()
}

// Update Dashboard
function updateDashboard() {
  document.getElementById("profile-username").textContent = userData.username || "-"
  document.getElementById("profile-email").textContent = userData.email || "-"
  document.getElementById("profile-goal").textContent = userData.goal || "-"
  document.getElementById("profile-budget").textContent = userData.budget

  const totalSpent = userData.cart.reduce((sum, item) => sum + item.price, 0)
  document.getElementById("total-spent").textContent = totalSpent
  document.getElementById("total-items").textContent = userData.cart.length
  document.getElementById("meals-planned").textContent = Object.keys(userData.weeklyPlan).length

  const caloriePercent = (userData.dailyCalories / userData.targetCalories) * 100
  document.getElementById("current-calories").textContent = userData.dailyCalories
  document.getElementById("target-calories").textContent = userData.targetCalories
  document.getElementById("calorie-progress").style.width = Math.min(caloriePercent, 100) + "%"
  document.getElementById("remaining-calories").textContent = Math.max(
    0,
    userData.targetCalories - userData.dailyCalories,
  )
}

// Add Ingredient
function addIngredient() {
  const input = document.getElementById("ingredient-input")
  const ingredient = input.value.trim()

  if (!ingredient) {
    showNotification("Please enter an ingredient")
    return
  }

  if (userData.ingredients.includes(ingredient)) {
    showNotification("Already added")
    return
  }

  userData.ingredients.push(ingredient)
  saveData()
  input.value = ""
  renderIngredients()
  loadSuggestedMeals()
}

// Render Ingredients
function renderIngredients() {
  const list = document.getElementById("ingredients-list")
  list.innerHTML = userData.ingredients
    .map(
      (ing) => `
        <div class="ingredient-tag">
            ${ing}
            <button type="button" onclick="removeIngredient('${ing}')">x</button>
        </div>
    `,
    )
    .join("")
}

// Remove Ingredient
function removeIngredient(ingredient) {
  userData.ingredients = userData.ingredients.filter((i) => i !== ingredient)
  saveData()
  renderIngredients()
  loadSuggestedMeals()
}

function findMatchingMeals(userIngredients) {
  const matches = []

  Object.entries(mealDatabase).forEach(([name, meal]) => {
    const mealIngredientsLower = meal.ingredients.map((i) => i.toLowerCase())
    const userIngredientsLower = userIngredients.map((i) => i.toLowerCase())

    let matchCount = 0
    userIngredientsLower.forEach((userIng) => {
      mealIngredientsLower.forEach((mealIng) => {
        if (mealIng.includes(userIng) || userIng.includes(mealIng)) {
          matchCount++
        }
      })
    })

    if (matchCount > 0) {
      const matchPercentage = Math.round((matchCount / meal.ingredients.length) * 100)
      matches.push({
        name,
        ...meal,
        matchPercentage,
        matchCount,
      })
    }
  })

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage)
}

// Load Suggested Meals
function loadSuggestedMeals() {
  renderIngredients()

  if (userData.ingredients.length === 0) {
    document.getElementById("suggested-meals").classList.add("hidden")
    return
  }

  const suggested = findMatchingMeals(userData.ingredients)

  if (suggested.length === 0) {
    document.getElementById("suggested-meals").classList.add("hidden")
    return
  }

  document.getElementById("suggested-meals").classList.remove("hidden")
  const grid = document.getElementById("meals-grid")
  grid.innerHTML = suggested
    .map(
      (meal) => `
        <div class="meal-card" onclick="addMealToWeekly('${meal.name}')">
            <h4>${meal.name}</h4>
            <p style="color: #7ebcaf; font-weight: 600; margin: 5px 0;">Match: ${meal.matchPercentage}%</p>
            <p>Time: ${meal.time} | Servings: ${meal.servings} | Calories: ${meal.calories}</p>
            <p style="font-size: 12px; color: #666; margin-top: 8px;">Ingredients: ${meal.ingredients.join(", ")}</p>
        </div>
    `,
    )
    .join("")
}

// Add Recipe Ingredient
function addRecipeIngredient() {
  const input = document.getElementById("recipe-ingredient-input")
  const ingredient = input.value.trim()

  if (!ingredient) {
    showNotification("Please enter an ingredient")
    return
  }

  if (userData.recipeIngredients.includes(ingredient)) {
    showNotification("Already added")
    return
  }

  userData.recipeIngredients.push(ingredient)
  saveData()
  input.value = ""
  loadRecipeIngredients()
}

// Load Recipe Ingredients
function loadRecipeIngredients() {
  const list = document.getElementById("recipe-ingredients")
  list.innerHTML = userData.recipeIngredients
    .map(
      (ing) => `
        <div class="recipe-ingredient-tag">
            ${ing}
            <button type="button" onclick="removeRecipeIngredient('${ing}')">x</button>
        </div>
    `,
    )
    .join("")
}

// Remove Recipe Ingredient
function removeRecipeIngredient(ingredient) {
  userData.recipeIngredients = userData.recipeIngredients.filter((i) => i !== ingredient)
  saveData()
  loadRecipeIngredients()
}

function generateRecipe() {
  if (userData.recipeIngredients.length === 0) {
    showNotification("Add at least one ingredient")
    return
  }

  const ingredientList = userData.recipeIngredients.join(", ")

  const recipeTemplates = [
    {
      name: `Quick ${userData.recipeIngredients[0]} Stir Fry`,
      ingredients: userData.recipeIngredients,
      instructions: [
        `Prepare all ${userData.recipeIngredients.length} ingredients by washing and chopping`,
        "Heat 2 tablespoons oil in a wok or large pan",
        `Add ${userData.recipeIngredients[0]} first and cook for 3-4 minutes`,
        `Add remaining ingredients: ${userData.recipeIngredients.slice(1).join(", ")}`,
        "Stir fry for 8-10 minutes until cooked",
        "Season with salt, pepper, and soy sauce",
        "Serve hot with rice or bread",
      ],
      time: "20 mins",
      servings: 2,
    },
    {
      name: `Healthy ${userData.recipeIngredients[0]} Bowl`,
      ingredients: userData.recipeIngredients,
      instructions: [
        "Prepare a base with cooked rice or quinoa",
        `Cook or prepare ${userData.recipeIngredients.join(", ")}`,
        "Arrange ingredients in a bowl",
        "Add your favorite sauce or dressing",
        "Mix well before eating",
        "Garnish with fresh herbs",
        "Enjoy your nutritious meal",
      ],
      time: "25 mins",
      servings: 1,
    },
    {
      name: `${userData.recipeIngredients[0]} Salad`,
      ingredients: userData.recipeIngredients,
      instructions: [
        `Chop all ingredients: ${ingredientList}`,
        "Place in a large mixing bowl",
        "Add 2 tablespoons olive oil",
        "Add 1 tablespoon lemon juice",
        "Season with salt and pepper",
        "Toss everything together",
        "Serve immediately",
      ],
      time: "10 mins",
      servings: 2,
    },
    {
      name: `Baked ${userData.recipeIngredients[0]} Medley`,
      ingredients: userData.recipeIngredients,
      instructions: [
        "Preheat oven to 200 degrees Celsius",
        `Prepare ingredients: ${ingredientList}`,
        "Arrange on a baking tray",
        "Drizzle with olive oil",
        "Season with herbs and spices",
        "Bake for 20-25 minutes",
        "Serve hot",
      ],
      time: "30 mins",
      servings: 2,
    },
    {
      name: `${userData.recipeIngredients[0]} Curry`,
      ingredients: userData.recipeIngredients,
      instructions: [
        "Heat oil in a pan",
        "Add onions and garlic",
        "Add spices (turmeric, cumin, coriander)",
        `Add main ingredients: ${ingredientList}`,
        "Add tomato paste or coconut milk",
        "Simmer for 15-20 minutes",
        "Serve with rice or bread",
      ],
      time: "35 mins",
      servings: 3,
    },
  ]

  const recipe = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)]
  displayRecipe(recipe)
  showNotification("Recipe generated successfully!")
}

// Display Recipe
function displayRecipe(recipe) {
  document.getElementById("recipe-name").textContent = recipe.name
  document.getElementById("recipe-ingredients-list").innerHTML = recipe.ingredients
    .map((ing) => `<li>${ing}</li>`)
    .join("")
  document.getElementById("recipe-instructions").innerHTML = recipe.instructions
    .map((inst) => `<li>${inst}</li>`)
    .join("")
  document.getElementById("recipe-time").textContent = recipe.time
  document.getElementById("recipe-servings").textContent = recipe.servings
  document.getElementById("generated-recipe").classList.remove("hidden")
}

// Load Weekly Planner
function loadWeeklyPlanner() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const grid = document.getElementById("weekly-grid")
  grid.innerHTML = ""

  days.forEach((day) => {
    const card = document.createElement("div")
    card.className = "day-card"
    const meal = userData.weeklyPlan[day] || "Not planned"
    card.innerHTML = `
            <h4>${day}</h4>
            <div class="meal-slot" onclick="planMeal('${day}')">
                <p>${meal}</p>
            </div>
        `
    grid.appendChild(card)
  })
}

// Plan Meal
function planMeal(day) {
  const meal = prompt("Enter meal for " + day + ":")
  if (meal) {
    userData.weeklyPlan[day] = meal
    saveData()
    loadWeeklyPlanner()
    showNotification("Meal planned for " + day)
  }
}

// Add Meal to Weekly
function addMealToWeekly(mealName) {
  const day = prompt("Which day? (Monday-Sunday)")
  if (day && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(day)) {
    userData.weeklyPlan[day] = mealName
    saveData()
    showNotification(mealName + " added to " + day)
  }
}

// Generate Shopping from Plan
function generateShoppingFromPlan() {
  showNotification("Shopping list generated from weekly plan")
}

// Clear Weekly Plan
function clearWeeklyPlan() {
  if (confirm("Clear all weekly plans?")) {
    userData.weeklyPlan = {}
    saveData()
    loadWeeklyPlanner()
    showNotification("Weekly plan cleared")
  }
}

// Update Cart
function updateCart() {
  const itemsList = document.getElementById("cart-items-list")
  const total = userData.cart.reduce((sum, item) => sum + item.price, 0)
  const budgetLeft = userData.budget - total

  document.getElementById("cart-items").textContent = userData.cart.length
  document.getElementById("cart-total").textContent = total
  document.getElementById("budget-status").textContent = budgetLeft >= 0 ? "Within Budget" : "Over Budget"

  itemsList.innerHTML = userData.cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.calories} cal | ${item.protein}g protein</p>
            </div>
            <div class="item-price">Rs${item.price}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
    `,
    )
    .join("")
}

// Remove from Cart
function removeFromCart(itemName) {
  const item = userData.cart.find((i) => i.name === itemName)
  if (item) {
    userData.dailyCalories -= item.calories
  }
  userData.cart = userData.cart.filter((item) => item.name !== itemName)
  saveData()
  updateCart()
  showNotification("Removed from cart")
}

// Clear Cart
function clearCart() {
  if (confirm("Clear entire cart?")) {
    userData.dailyCalories = 0
    userData.cart = []
    saveData()
    updateCart()
    showNotification("Cart cleared")
  }
}

// Print List
function printList() {
  window.print()
}

// Share List
function shareList() {
  const list = userData.cart.map((item) => item.name + " - Rs" + item.price).join("\n")
  if (navigator.share) {
    navigator.share({
      title: "NutriKart Shopping List",
      text: list,
    })
  } else {
    alert("Shopping List:\n" + list)
  }
}

// Submit Feedback
function submitFeedback(e) {
  e.preventDefault()
  const rating = document.querySelectorAll(".star.active").length
  const text = document.getElementById("feedback-text").value

  if (rating === 0) {
    showNotification("Please rate first")
    return
  }

  userData.reviews.push({
    username: userData.username,
    rating: rating,
    text: text,
    date: new Date().toLocaleDateString(),
  })

  saveData()
  document.getElementById("feedback-form").reset()
  document.querySelectorAll(".⭐").forEach((s) => s.classList.remove("active"))
  document.getElementById("rating-text").textContent = "Click to rate"
  loadReviews()
  showNotification("Thank you for your feedback!")
}

// Load Reviews
function loadReviews() {
  const container = document.getElementById("reviews-container")
  container.innerHTML = userData.reviews
    .map(
      (review) => `
        <div class="review-item">
            <div class="review-header">
                <strong>${review.username}</strong>
                <span class="review-rating">${"⭐ ".repeat(review.rating)}</span>
            </div>
            <p class="review-text">${review.text}</p>
            <small>${review.date}</small>
        </div>
    `,
    )
    .join("")
}

// Edit Profile
function editProfile() {
  const newUsername = prompt("New username:", userData.username)
  if (newUsername) {
    userData.username = newUsername
    saveData()
    updateDashboard()
    showNotification("Profile updated")
  }
}

// Show Notification
function showNotification(message) {
  const notif = document.getElementById("notification")
  notif.textContent = message
  notif.classList.remove("hidden")
  setTimeout(() => {
    notif.classList.add("hidden")
  }, 3000)
}

// Simple Assistant functionality
function openAssistant() {
  const modal = document.getElementById('assistant-modal');
  modal.classList.remove('hidden');
}

function closeAssistant() {
  const modal = document.getElementById('assistant-modal');
  modal.classList.add('hidden');
}

// Close assistant when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('assistant-modal');
  const modalContent = document.querySelector('.assistant-modal-content');
  
  if (e.target === modal) {
    closeAssistant();
  }
});

// Close assistant with escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAssistant();
  }
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode")
}
