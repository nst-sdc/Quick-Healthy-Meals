import React from 'react'
import './RecipeList.css'

const RecipeList = ({ recipes, onDeleteRecipe, darkMode }) => {
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`
    } else if (minutes === 60) {
      return '1 hour'
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
    }
  }

  if (recipes.length === 0) {
    return (
      <div className={`recipe-list empty ${darkMode ? 'dark' : 'light'}`}>
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <h3>No recipes yet!</h3>
          <p>Add your first recipe to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`recipe-list ${darkMode ? 'dark' : 'light'}`}>
      <h2 className="list-title">Your Recipes</h2>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className={`recipe-card ${recipe.isHealthy ? 'healthy' : 'indulgent'}`}>
            <div className="recipe-header">
              <h3 className="recipe-name">{recipe.name}</h3>
              <div className="recipe-meta">
                <span className="time-badge">
                  ⏱️ {formatTime(recipe.cookingTime)}
                </span>
                <span className={`health-badge ${recipe.isHealthy ? 'healthy' : 'indulgent'}`}>
                  {recipe.isHealthy ? '🥗 Healthy' : '🍕 Indulgent'}
                </span>
              </div>
            </div>

            <div className="recipe-content">
              <div className="ingredients-section">
                <h4>Ingredients:</h4>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-bullet">•</span>
                      {ingredient.text}
                    </li>
                  ))}
                </ul>
              </div>

              {recipe.instructions && (
                <div className="instructions-section">
                  <h4>Instructions:</h4>
                  <p className="instructions-text">{recipe.instructions}</p>
                </div>
              )}

              <div className="recipe-footer">
                <span className="recipe-date">
                  Added: {new Date(recipe.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDeleteRecipe(recipe.id)}
                  className="delete-btn"
                  title="Delete recipe"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecipeList 