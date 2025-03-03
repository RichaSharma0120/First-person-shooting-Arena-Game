import asyncio
import websockets
import json
import logging
from matchmaking import Matchmaking
from game_state import GameState
from synchronization import synchronize_game_state

logging.basicConfig(level=logging.INFO)

class GameServer:
    def __init__(self):
        self.clients = set()
        self.players = {}
        self.matchmaking = Matchmaking()
        self.game_state = GameState()

    async def handler(self, websocket, path):
        self.clients.add(websocket)
        player_id = str(id(websocket))
        self.players[player_id] = websocket
        await self.send_welcome_message(websocket)
        logging.info(f"Player {player_id} connected.")

        try:
            async for message in websocket:
                await self.handle_message(player_id, message)
                await self.broadcast(message)
        finally:
            self.clients.remove(websocket)
            await self.disconnect_player(player_id)
            logging.info(f"Player {player_id} disconnected.")

    async def send_welcome_message(self, websocket):
        welcome_message = json.dumps({"type": "welcome", "message": "Welcome to the game!"})
        await websocket.send(welcome_message)

    async def handle_message(self, player_id, message):
        data = json.loads(message)
        if data["type"] == "action":
            self.process_action(player_id, data["action"])
            await synchronize_game_state(self.players, self.game_state)

    def process_action(self, player_id, action):
        # Process player actions (e.g., movement, shooting)
        pass

    async def disconnect_player(self, player_id):
        del self.players[player_id]
        # Handle player disconnection logic

    async def broadcast(self, message):
        if self.clients:
            await asyncio.wait([client.send(message) for client in self.clients])

    async def run(self):
        logging.info("Starting server on ws://localhost:6789")
        async with websockets.serve(self.handler, "localhost", 6789):
            await asyncio.Future()  # run forever

if __name__ == "__main__":
    server = GameServer()
    asyncio.run(server.run())