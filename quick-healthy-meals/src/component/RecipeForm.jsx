import React, { useState } from "react";
import "./RecipeForm.css";
import AIService from "../services/aiService";

const RecipeForm = ({ onAddRecipe, darkMode }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [cookingTime, setCookingTime] = useState("15");
  const [isHealthy, setIsHealthy] = useState(true);
  const [instructions, setInstructions] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const timeOptions = [
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "20", label: "20 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
  ];

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([
        ...ingredients,
        { id: Date.now(), text: newIngredient.trim(), completed: false },
      ]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const toggleIngredient = (id) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, completed: !ingredient.completed }
          : ingredient
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeName.trim() && ingredients.length > 0) {
      const recipe = {
        name: recipeName,
        ingredients: ingredients.filter((ing) => !ing.completed), // Only add uncompleted ingredients
        cookingTime: parseInt(cookingTime),
        isHealthy,
        instructions: instructions.trim(),
        completedIngredients: ingredients.filter((ing) => ing.completed),
      };
      onAddRecipe(recipe);

      // Reset form
      setRecipeName("");
      setIngredients([]);
      setNewIngredient("");
      setCookingTime("15");
      setIsHealthy(true);
      setInstructions("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  const generateAIRecipe = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient to generate an AI recipe!");
      return;
    }

    setIsGenerating(true);
    try {
      // Get API key from environment variables (Vite uses import.meta.env)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error(
          "Gemini API key not found. Please check your .env file."
        );
      }

      const aiService = new AIService(apiKey);
      const ingredientTexts = ingredients.map((ing) => ing.text);
      const aiRecipe = await aiService.generateRecipe(
        ingredientTexts,
        parseInt(cookingTime),
        isHealthy
      );

      // Auto-fill the form with AI generated recipe
      setRecipeName(aiRecipe.name || "AI Generated Recipe");
      setInstructions(aiRecipe.instructions || "");

      // Add additional ingredients if any
      if (aiRecipe.additionalIngredients) {
        const additionalIngs = aiRecipe.additionalIngredients
          .split(",")
          .map((ing) => ing.trim());
        const newIngredients = additionalIngs.map((ing) => ({
          id: Date.now() + Math.random(),
          text: ing,
          completed: false,
        }));
        setIngredients((prev) => [...prev, ...newIngredients]);
      }

      // Show tips if available
      if (aiRecipe.tips) {
        alert(`Recipe Tips: ${aiRecipe.tips}`);
      }
    } catch (error) {
      console.error("AI Recipe generation failed:", error);
      alert(`Failed to generate AI recipe: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`recipe-form ${darkMode ? "dark" : "light"}`}>
      <h2 className="form-title">Add New Recipe</h2>

      <form onSubmit={handleSubmit} className="form">

        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time</label>
          <select
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="select"
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label">Health Level</label>
          <div className="health-toggle">
            <button
              type="button"
              className={`health-btn ${isHealthy ? "active" : ""}`}
              onClick={() => setIsHealthy(true)}
            >
              <span className="health-icon">🥗</span>
              Healthy
            </button>
            <button
              type="button"
              className={`health-btn ${!isHealthy ? "active" : ""}`}
              onClick={() => setIsHealthy(false)}
            >
              <span className="health-icon">🍕</span>
              Indulgent
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients (Todo List)</label>
          <div className="ingredient-input">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add ingredient..."
              className="input"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="add-btn"
              disabled={!newIngredient.trim()}
            >
              +
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="ingredients-list">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="ingredient-item">
                  <button
                    type="button"
                    className={`ingredient-checkbox ${
                      ingredient.completed ? "completed" : ""
                    }`}
                    onClick={() => toggleIngredient(ingredient.id)}
                  >
                    {ingredient.completed ? "✓" : ""}
                  </button>
                  <span
                    className={`ingredient-text ${
                      ingredient.completed ? "completed" : ""
                    }`}
                  >
                    {ingredient.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.id)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Cooking Instructions (Optional)</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Add cooking instructions..."
            className="textarea"
            rows="3"
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={generateAIRecipe}
            className="ai-btn"
            disabled={ingredients.length === 0 || isGenerating}
          >
            {isGenerating ? "🤖 Generating..." : "🤖 Generate AI Recipe"}
          </button>

          <button
            type="submit"
            className="submit-btn"
            disabled={!recipeName.trim() || ingredients.length === 0}
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
