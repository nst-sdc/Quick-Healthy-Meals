# 🍽️ Quick Healthy Meals - AI Recipe Generator

A beautiful web application that generates recipes using AI based on your available ingredients and preferences.

## ✨ Features

- **Ingredient Todo List** - Add ingredients one by one, mark them as completed
- **AI Recipe Generation** - Get recipes from OpenAI, Claude, or Gemini
- **Cooking Time Selection** - Choose from 5 minutes to 2 hours
- **Health Preferences** - Toggle between healthy and indulgent recipes
- **Dark/Light Theme** - Beautiful UI with theme toggle
- **Recipe Management** - Save, view, and delete recipes
- **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AI API Key

Create a `.env` file in the root directory:
```env
# AI Configuration
AI_API_KEY=your-ai-api-key-here
AI_PROVIDER=openai

# Server Configuration
PORT=3001
```

### 3. Get AI API Keys

#### OpenAI (Recommended)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up and get your API key
3. Set `AI_PROVIDER=openai` in `.env`

#### Anthropic Claude
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up and get your API key
3. Set `AI_PROVIDER=claude` in `.env`

#### Google Gemini
1. Go to [makersuite.google.com](https://makersuite.google.com)
2. Get your API key
3. Set `AI_PROVIDER=gemini` in `.env`

### 4. Run the Application

#### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```

#### Production Mode
```bash
npm run start
```

#### Frontend Only (for development)
```bash
npm run dev
```

#### Backend Only
```bash
npm run server
```

## 🎯 How to Use

1. **Add Ingredients**: Type ingredients in the todo list and press Enter or click "+"
2. **Set Preferences**: Choose cooking time and health level
3. **Generate Recipe**: Click "Generate Recipe with AI"
4. **Review & Save**: The AI will create a complete recipe with instructions
5. **Manage Recipes**: View all your saved recipes in the right panel

## 🏗️ Project Structure

```
quick-healthy-meals/
├── src/
│   ├── component/
│   │   ├── RecipeForm.jsx      # Main form with ingredient todo list
│   │   ├── RecipeList.jsx      # Display saved recipes
│   │   ├── ThemeToggle.jsx     # Dark/light mode toggle
│   │   └── *.css              # Component styles
│   ├── services/
│   │   └── aiService.js        # AI API integration (for reference)
│   ├── App.jsx                 # Main application
│   └── main.jsx               # Entry point
├── server.js                  # Backend server with AI integration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_API_KEY` | Your AI provider API key | Required |
| `AI_PROVIDER` | AI provider (openai/claude/gemini) | openai |
| `PORT` | Server port | 3001 |

### AI Provider Setup

The backend supports multiple AI providers. Update your `.env` file:

```env
# For OpenAI
AI_API_KEY=sk-your-openai-key-here
AI_PROVIDER=openai

# For Claude
AI_API_KEY=sk-ant-your-claude-key-here
AI_PROVIDER=claude

# For Gemini
AI_API_KEY=your-gemini-key-here
AI_PROVIDER=gemini
```

## 🎨 Customization

### Styling
- All styles are in CSS files with modern design
- Dark/light theme support
- Responsive design for mobile devices
- Custom animations and transitions

### AI Prompt
You can customize the AI prompt in `server.js` by modifying the content in the API calls.

## 🚀 Deployment

### Vercel/Netlify (Frontend Only)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Heroku/Railway (Full Stack)
1. Set environment variables in your hosting platform
2. Deploy the entire project
3. The server will serve the built React app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check that your API key is correct
2. Ensure your AI provider is properly configured
3. Check the browser console for errors
4. Verify the backend server is running

---

**Happy Cooking! 🍳**
