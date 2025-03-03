import asyncio
import websockets
import json

connected_clients = set()

async def register(websocket):
    connected_clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        connected_clients.remove(websocket)

async def broadcast(message):
    if connected_clients:  # Check if there are any connected clients
        await asyncio.wait([client.send(message) for client in connected_clients])

async def handler(websocket, path):
    await register(websocket)
    async for message in websocket:
        data = json.loads(message)
        # Handle incoming messages (e.g., player actions, game state updates)
        await broadcast(message)  # Broadcast the message to all connected clients

async def main():
    async with websockets.serve(handler, "localhost", 6789):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())