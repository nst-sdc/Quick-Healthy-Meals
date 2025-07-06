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
          <div key={recipe.id} className={`recipe-card ${recipe.isHealthy ? 'healthy' : 'indulgent'} ${recipe.isAIGenerated ? 'ai-generated' : ''}`}>
            <div className="recipe-header">
              <h3 className="recipe-name">
                {recipe.name}
                {recipe.isAIGenerated && <span className="ai-badge">🤖 AI</span>}
              </h3>
              <div className="recipe-meta">
                <span className="time-badge">
                  ⏱️ {formatTime(recipe.cookingTime)}
                </span>
                <span className={`health-badge ${recipe.isHealthy ? 'healthy' : 'indulgent'}`}>
                  {recipe.isHealthy ? '🥗 Healthy' : '🍕 Indulgent'}
                </span>
                {recipe.isAIGenerated && recipe.difficulty && (
                  <span className={`difficulty-badge ${recipe.difficulty}`}>
                    {recipe.difficulty}
                  </span>
                )}
                {recipe.isAIGenerated && recipe.servings && (
                  <span className="servings-badge">
                    👥 {recipe.servings} servings
                  </span>
                )}
              </div>
            </div>

            <div className="recipe-content">
              <div className="ingredients-section">
                <h4>Ingredients:</h4>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-bullet">•</span>
                      {ingredient}
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

              {recipe.isAIGenerated && recipe.tips && (
                <div className="tips-section">
                  <h4>💡 Cooking Tips:</h4>
                  <p className="tips-text">{recipe.tips}</p>
                </div>
              )}

              <div className="recipe-footer">
                <span className="recipe-date">
                  {recipe.isAIGenerated ? 'AI Generated' : `Added: ${new Date(recipe.createdAt).toLocaleDateString()}`}
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