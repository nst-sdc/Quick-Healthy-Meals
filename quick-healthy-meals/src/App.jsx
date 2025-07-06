import React, { useState, useEffect } from 'react'
import './App.css'
import RecipeForm from './component/RecipeForm'
import RecipeList from './component/RecipeList'
import ThemeToggle from './component/ThemeToggle'

const App = () => {
  const [recipes, setRecipes] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes')
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes))
    }
  }, [])

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }, [recipes])

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setRecipes([...recipes, newRecipe])
  }

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="icon">🍽️</span>
            Quick Healthy Meals
          </h1>
          <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        </header>

        <main className="main">
          <RecipeForm onAddRecipe={addRecipe} darkMode={darkMode} />
          <RecipeList 
            recipes={recipes} 
            onDeleteRecipe={deleteRecipe}
            darkMode={darkMode}
          />
        </main>
      </div>
    </div>
  )
}

export default App