# Kickball Game

A simple web-based kickball game where you can play against the computer or simulate a game between two teams.

## Features

- Interactive kickball gameplay
- Score tracking for Home and Away teams
- Random outcomes (Home Run, Single, or Strike)
- Turn-based gameplay
- Responsive web interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and go to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm test` - Run tests (not implemented yet)

## How to Play

1. Click the "Kick Ball!" button to take your turn
2. Each kick has a random outcome:
   - **Home Run**: 4 points
   - **Single**: 1 point  
   - **Strike**: 0 points
3. Teams alternate turns after each kick
4. Use the "Reset Game" button to start over

## Project Structure

```
kickball/
├── package.json          # Project configuration and dependencies
├── index.js             # Main server file
├── public/              # Static files
│   └── index.html      # Game interface
└── README.md           # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Development**: Nodemon for auto-reload

## License

ISC
