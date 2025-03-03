class GameState:
    def __init__(self):
        self.players = {}
        self.obstacles = []
        self.scores = {}

    def add_player(self, player_id, position):
        self.players[player_id] = {
            'position': position,
            'health': 100
        }
        self.scores[player_id] = 0

    def remove_player(self, player_id):
        if player_id in self.players:
            del self.players[player_id]
            del self.scores[player_id]

    def update_player_position(self, player_id, position):
        if player_id in self.players:
            self.players[player_id]['position'] = position

    def player_hit(self, player_id, damage):
        if player_id in self.players:
            self.players[player_id]['health'] -= damage
            if self.players[player_id]['health'] <= 0:
                self.remove_player(player_id)

    def respawn_player(self, player_id, position):
        if player_id not in self.players:
            self.add_player(player_id, position)

    def get_game_state(self):
        return {
            'players': self.players,
            'obstacles': self.obstacles,
            'scores': self.scores
        }

    def add_obstacle(self, obstacle):
        self.obstacles.append(obstacle)

    def remove_obstacle(self, obstacle):
        if obstacle in self.obstacles:
            self.obstacles.remove(obstacle)