// AI Service for Recipe Generation
// This service provides a flexible interface for different AI APIs
import { GoogleGenerativeAI } from "@google/generative-ai";

class AIService {
  constructor(apiKey, provider = "gemini") {
    this.apiKey = apiKey;
    this.provider = provider;

    // Validate API key on initialization
    if (!this.apiKey) {
      console.warn(
        "Gemini API key not found. Please provide an API key when creating AIService instance"
      );
    }
  }

  // Generate recipe using Google Gemini
  async generateRecipe(ingredients, cookingTime, isHealthy) {
    try {
      // Initialize the Google Generative AI client
      const genAI = new GoogleGenerativeAI(this.apiKey);

      // Get the model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const prompt = `Create a recipe using these ingredients: ${ingredients.join(
        ", "
      )}. 
      Cooking time: ${cookingTime} minutes. 
      Health preference: ${isHealthy ? "healthy" : "indulgent"}. 
      
      Please provide a JSON response with the following structure:
      {
        "name": "Creative recipe name",
        "instructions": "Step-by-step cooking instructions",
        "additionalIngredients": "comma-separated list of additional ingredients needed",
        "tips": "Cooking tips and suggestions",
        "difficulty": "easy/medium/hard",
        "servings": "number of servings"
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return JSON.parse(text);
      }
    } catch (error) {
      console.error("Gemini Recipe generation error:", error);
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }

  // Validate API key format (basic validation)
  static validateAPIKey(apiKey, provider = "gemini") {
    if (!apiKey || apiKey.trim().length === 0) {
      return false;
    }

    switch (provider.toLowerCase()) {
      case "gemini":
        return apiKey.length > 20; // Google API keys don't have a specific prefix
      default:
        return apiKey.length > 10;
    }
  }
}

export default AIService;
