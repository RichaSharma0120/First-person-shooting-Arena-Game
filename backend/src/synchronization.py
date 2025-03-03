from typing import Dict, Any

def synchronize_game_state(clients: Dict[str, Any], game_state: Dict[str, Any]) -> None:
    for client in clients.values():
        client.send(json.dumps(game_state))

def update_player_state(player_id: str, new_state: Dict[str, Any], game_state: Dict[str, Any]) -> None:
    game_state['players'][player_id] = new_state
    synchronize_game_state(game_state['clients'], game_state)

def handle_player_action(player_id: str, action: str, game_state: Dict[str, Any]) -> None:
    if action == "shoot":
        # Handle shooting logic
        pass
    elif action == "move":
        # Handle movement logic
        pass
    update_player_state(player_id, game_state['players'][player_id], game_state)