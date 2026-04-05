# PAEP Practice

A (vibe coded) React application designed for practicing logical reasoning questions for the PAEP (Prueba de Aptitud para el Empleo Público) exam. This app provides interactive quizzes with various sections including logical sequences, verbal reasoning, numerical reasoning, and more.

## Features

- Interactive quiz interface
- Multiple question sections (Logical Sequences, Verbal Reasoning, etc.)
- Real-time scoring and results
- Responsive design

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 16 or higher (LTS recommended)
- **npm**: Comes with Node.js installation

You can download Node.js from [nodejs.org](https://nodejs.org/).

## Installation and Setup

1. **Clone or download the repository**:

   ```
   git clone <repository-url>
   cd PAEP_practice
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Start the development server**:

   ```
   npm start
   ```

   The app will open in your default browser at `http://localhost:3000`.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (irreversible)

## Project Structure

```
src/
├── components/
│   ├── HomeScreen.jsx
│   ├── QuizScreen.jsx
│   └── ResultsScreen.jsx
├── data/
│   └── sections.js
├── hooks/
│   └── useQuiz.js
├── utils/
│   └── helpers.js
└── index.js
```

## Contributing

Feel free to contribute by adding more questions, improving the UI, or enhancing functionality.
