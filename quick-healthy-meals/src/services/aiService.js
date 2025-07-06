// AI Service for Recipe Generation
// This service provides a flexible interface for different AI APIs

class AIService {
  constructor(apiKey, provider = 'openai') {
    this.apiKey = apiKey
    this.provider = provider
  }

  // Generate recipe using OpenAI
  async generateRecipeWithOpenAI(ingredients, cookingTime, isHealthy) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and recipe creator. Create detailed, step-by-step recipes based on the given ingredients and preferences. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: `Create a recipe using these ingredients: ${ingredients.join(', ')}. 
            Cooking time: ${cookingTime} minutes. 
            Health preference: ${isHealthy ? 'healthy' : 'indulgent'}. 
            
            Please provide a JSON response with the following structure:
            {
              "name": "Creative recipe name",
              "instructions": "Step-by-step cooking instructions",
              "additionalIngredients": "comma-separated list of additional ingredients needed",
              "tips": "Cooking tips and suggestions",
              "difficulty": "easy/medium/hard",
              "servings": "number of servings"
            }`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  }

  // Generate recipe using Anthropic Claude (alternative)
  async generateRecipeWithClaude(ingredients, cookingTime, isHealthy) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Create a recipe using these ingredients: ${ingredients.join(', ')}. 
            Cooking time: ${cookingTime} minutes. 
            Health preference: ${isHealthy ? 'healthy' : 'indulgent'}. 
            
            Please provide a JSON response with the following structure:
            {
              "name": "Creative recipe name",
              "instructions": "Step-by-step cooking instructions",
              "additionalIngredients": "comma-separated list of additional ingredients needed",
              "tips": "Cooking tips and suggestions",
              "difficulty": "easy/medium/hard",
              "servings": "number of servings"
            }`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    return JSON.parse(data.content[0].text)
  }

  // Generate recipe using Google Gemini (alternative)
  async generateRecipeWithGemini(ingredients, cookingTime, isHealthy) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a recipe using these ingredients: ${ingredients.join(', ')}. 
                Cooking time: ${cookingTime} minutes. 
                Health preference: ${isHealthy ? 'healthy' : 'indulgent'}. 
                
                Please provide a JSON response with the following structure:
                {
                  "name": "Creative recipe name",
                  "instructions": "Step-by-step cooking instructions",
                  "additionalIngredients": "comma-separated list of additional ingredients needed",
                  "tips": "Cooking tips and suggestions",
                  "difficulty": "easy/medium/hard",
                  "servings": "number of servings"
                }`
              }
            ]
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return JSON.parse(data.candidates[0].content.parts[0].text)
  }

  // Main method to generate recipe based on provider
  async generateRecipe(ingredients, cookingTime, isHealthy) {
    try {
      switch (this.provider.toLowerCase()) {
        case 'openai':
          return await this.generateRecipeWithOpenAI(ingredients, cookingTime, isHealthy)
        case 'claude':
          return await this.generateRecipeWithClaude(ingredients, cookingTime, isHealthy)
        case 'gemini':
          return await this.generateRecipeWithGemini(ingredients, cookingTime, isHealthy)
        default:
          throw new Error(`Unsupported AI provider: ${this.provider}`)
      }
    } catch (error) {
      console.error('AI Recipe generation error:', error)
      throw error
    }
  }

  // Validate API key format (basic validation)
  static validateAPIKey(apiKey, provider = 'openai') {
    if (!apiKey || apiKey.trim().length === 0) {
      return false
    }

    switch (provider.toLowerCase()) {
      case 'openai':
        return apiKey.startsWith('sk-') && apiKey.length > 20
      case 'claude':
        return apiKey.startsWith('sk-ant-') && apiKey.length > 20
      case 'gemini':
        return apiKey.length > 20 // Google API keys don't have a specific prefix
      default:
        return apiKey.length > 10
    }
  }
}

export default AIService 