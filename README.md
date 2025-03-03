# Multiplayer FPS Arena Game

## Overview
The Multiplayer FPS Arena is a real-time multiplayer first-person shooter game where players compete against each other in an arena filled with destructible obstacles. Players can spawn, shoot, and respawn, all while navigating a dynamic environment.

## Features
- Players represented as spheres or humanoid models.
- Randomly generated obstacles in the arena.
- Real-time shooting mechanics with collision detection.
- Health bars to track player health.
- Respawn mechanics for eliminated players.
- Matchmaking system to pair players for competitive gameplay.

## Project Structure
The project is organized into three main components: frontend, backend, and networking.

### Frontend
- **Technologies**: Three.js
- **Directory**: `frontend/src`
  - `index.html`: Main HTML entry point for the game.
  - `main.js`: Initializes the Three.js scene and handles user inputs.
  - `game/renderer.js`: Manages the rendering of the game world.
  - `game/player.js`: Represents the player and includes movement and shooting methods.
  - `game/obstacles.js`: Generates and manages obstacles in the arena.
  - `game/health.js`: Manages player health and health bar display.
  - `game/respawn.js`: Handles player respawn mechanics.
  - `assets/models/`: Contains 3D models for players and obstacles.
  - `assets/textures/`: Contains textures for player and obstacle models.

### Backend
- **Technologies**: Python
- **Directory**: `backend/src`
  - `server.py`: Main entry point for the backend server.
  - `matchmaking.py`: Manages the matchmaking system.
  - `game_state.py`: Manages the current state of the game.
  - `synchronization.py`: Handles synchronization of game state between clients and server.

### Networking
- **Technologies**: WebSockets
- **Directory**: `networking/src`
  - `websocket_server.py`: Implements WebSocket server logic.
  - `websocket_client.py`: Implements WebSocket client logic.

## Setup Instructions
1. Clone the repository.
2. Navigate to the `frontend` directory and install dependencies using npm.
3. Navigate to the `backend` directory and install required Python packages listed in `requirements.txt`.
4. Start the backend server.
5. Open the `index.html` file in a web browser to play the game.

## Future Enhancements
- Add more game modes and maps.
- Implement advanced AI for non-player characters.
- Enhance graphics and animations for a more immersive experience.

## License
This project is licensed under the MIT License.