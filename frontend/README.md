# Frontend Multiplayer FPS Arena Documentation

## Overview
This project is a Multiplayer First-Person Shooter (FPS) Arena game built using Three.js for the frontend. Players compete in an arena, represented as spheres or humanoid models, with destructible obstacles, health bars, and respawn mechanics.

## Features
- **Player Representation**: Players are represented as spheres or humanoid models.
- **Randomly Generated Obstacles**: The arena contains obstacles that are generated randomly.
- **Real-Time Shooting Mechanics**: Players can shoot each other with real-time collision detection.
- **Health Bars**: Each player has a health bar that updates based on gameplay.
- **Respawn Mechanics**: Players can respawn after being eliminated.
- **Matchmaking System**: Players are paired for matches through a matchmaking system.

## File Structure
- `src/index.html`: Main HTML entry point for the game.
- `src/main.js`: Initializes the Three.js scene and handles user inputs.
- `src/game/renderer.js`: Manages the rendering of the game world.
- `src/game/player.js`: Represents the player and includes movement and shooting methods.
- `src/game/obstacles.js`: Generates and manages obstacles in the arena.
- `src/game/health.js`: Manages the health bar for players.
- `src/game/respawn.js`: Handles player respawn mechanics.
- `src/assets/models/`: Contains 3D models for players and obstacles.
- `src/assets/textures/`: Contains textures for player and obstacle models.

## Getting Started
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies using npm:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to play the game.

## Dependencies
- Three.js: A JavaScript library for creating 3D graphics in the browser.

## Contributing
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and contributions are welcome!