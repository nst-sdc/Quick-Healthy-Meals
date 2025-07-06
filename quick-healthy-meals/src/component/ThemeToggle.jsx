import React from 'react'
import './ThemeToggle.css'

const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <div className="theme-toggle">
      <button
        onClick={onToggle}
        className={`toggle-btn ${darkMode ? 'dark' : 'light'}`}
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-icon">
          {darkMode ? '☀️' : '🌙'}
        </div>
        <span className="toggle-label">
          {darkMode ? 'Light' : 'Dark'} Mode
        </span>
      </button>
    </div>
  )
}

export default ThemeToggle 