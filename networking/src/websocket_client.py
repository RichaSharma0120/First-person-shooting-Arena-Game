import asyncio
import websockets
import json

class WebSocketClient:
    def __init__(self, uri):
        self.uri = uri
        self.connection = None

    async def connect(self):
        self.connection = await websockets.connect(self.uri)
        print("Connected to the server")

    async def send_message(self, message):
        if self.connection:
            await self.connection.send(json.dumps(message))
            print(f"Sent message: {message}")

    async def receive_message(self):
        while True:
            try:
                message = await self.connection.recv()
                print(f"Received message: {message}")
                self.handle_message(json.loads(message))
            except websockets.ConnectionClosed:
                print("Connection closed")
                break

    def handle_message(self, message):
        # Handle incoming messages from the server
        pass

    async def disconnect(self):
        if self.connection:
            await self.connection.close()
            print("Disconnected from the server")

    async def run(self):
        await self.connect()
        await asyncio.gather(self.receive_message())

if __name__ == "__main__":
    client = WebSocketClient("ws://localhost:8000")
    asyncio.run(client.run())