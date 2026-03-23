# 🍽️ Smart Kitchen Assistant

## 📌 Project Overview

**Smart Kitchen Assistant** is a web-based application that helps users discover recipes based on the ingredients they already have at home. Instead of searching randomly, users can input available ingredients and receive relevant recipe suggestions, along with useful insights such as missing ingredients, cooking time, and nutritional information.

This project focuses on improving decision-making in the kitchen by providing smart recommendations and an intuitive user experience.



## 🎯 Objective

The objective of this project is to demonstrate:

* Integration of a public API using `fetch`
* Use of JavaScript array higher-order functions (HOFs) like `.map()`, `.filter()`, and `.sort()`
* Development of a clean and responsive user interface using CSS



## 🌐 API Used

This project uses the **Spoonacular API** to fetch recipe data.

* Provides recipe suggestions based on ingredients
* Includes details like cooking time, instructions, and nutrition
* Allows filtering and sorting of results



## 🚀 Features

### 🔍 Ingredient-Based Search

* Users can enter ingredients they have at home
* Displays recipes that can be prepared using those ingredients

###  Smart Suggestions

* Highlights missing ingredients required for each recipe
* Suggests recipes that are close matches

### 🎛️ Filtering Options

* Filter recipes by:

  * Vegetarian / Non-Vegetarian
  * Cooking time
  * Calorie range
  * Cuisine type

### 🔽 Sorting Options

* Sort recipes by:

  * Cooking time
  * Calories
  * Popularity

###  Save Recipes

* Users can save their favorite recipes
* Stored using browser `localStorage`

###  Recipe Details

* View full recipe information including:

  * Ingredients list
  * Step-by-step instructions
  * Cooking time and image

###  Nutrition Information

* Displays basic nutritional values such as calories, protein, and fats

### ⚡ User Experience Enhancements

* Loading indicators while fetching data
* “No results found” message
* Responsive design for different screen sizes


##  Technologies Used

* **HTML** – Structure of the application
* **CSS** – Styling and layout 
* **JavaScript** – Logic and interactivity
* **Fetch API** – To retrieve data from Spoonacular API
* **LocalStorage** – To store saved recipes



##  Use of JavaScript HOFs

The project makes use of array higher-order functions:

* `.map()` → To display recipe data dynamically
* `.filter()` → To apply user-selected filters
* `.sort()` → To organize recipes based on selected criteria
* `.find()` → To retrieve specific recipe details

##  Project Structure

Smart-Kitchen-Assistant/
│
├── index.html
├── style.css
├── script.js
├── assets/
└── README.md



##  Future Enhancements

* Auto-generated grocery list
* Dark mode toggle
* Voice input for ingredients
* Personalized recommendations


##  Conclusion

This project demonstrates the practical use of JavaScript concepts and API integration to build a functional and user-friendly web application. It emphasizes real-world usability by helping users make efficient cooking decisions based on available resources.

